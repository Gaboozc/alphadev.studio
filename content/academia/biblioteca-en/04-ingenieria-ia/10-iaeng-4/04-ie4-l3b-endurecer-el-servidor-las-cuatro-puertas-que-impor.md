# Hardening the Server: The Four Doors That Matter
area: AI Engineering | module: iaeng-4 — AI Application Security | lesson 4
id: ie4-l3b | type: reading | difficulty: professional
url: https://www.alphadev.studio/en/academia/ingenieria-ia/iaeng-4/ie4-l3b

## Content

## A newborn server is already under attack

That isn't rhetorical exaggeration: within the first hour of a new server getting a public IP, bots sweeping the entire internet try default passwords against its SSH. They aren't attacking you — they're attacking the default setup your cloud provider ships on every fresh server, trying it against every IP that exists.

Everything earlier in this module protects your model-powered system. This protects the machine that system runs on, and no prompt defense matters if someone walks in through SSH.

There are four doors. Close them in this order.

### 1. How you get in: SSH keys only

A password can be brute-forced; a 256-bit cryptographic key can't in any reasonable time.

```bash
# On your machine: generate a key pair if you don't have one
ssh-keygen -t ed25519 -C "your-email@example.com"

# Copy the public key to the server
ssh-copy-id usuario@tu-servidor
```

And on the server, disable what you no longer need:

```
# /etc/ssh/sshd_config
PasswordAuthentication no
PermitRootLogin no
```

`PasswordAuthentication no` shuts the brute-force door completely: with no password to try, there's nothing a bot can guess. `PermitRootLogin no` is the next door.

### 2. Which account you use: never root

The `root` account can do literally anything on the machine. An attacker compromising a normal user session has to find a second flaw to escalate privileges; one compromising `root` directly doesn't.

```bash
# Create an unprivileged user
adduser desarrollo

# Give it sudo access ONLY when needed (not a permanent root shell)
usermod -aG sudo desarrollo
```

With `PermitRootLogin no` set above, nobody can log in as `root` over SSH even with the password. Anyone needing admin privileges asks for them specifically with `sudo`, and that gets logged — unlike a root session where every action blends into the same user.

For **service accounts** — the process running your API, for instance — the same **least privilege** principle you applied to an agent's tools: that account doesn't need to reboot the server or read another service's files.

### 3. What files allow: deliberate permissions

`chmod 777` is the answer of someone who didn't understand the permission error and wanted it to go away. It grants read, write and execute to **anyone** reaching that machine, including a compromised process.

```bash
# Bad: everyone can read, write, and execute
chmod 777 config/secretos.env

# Good: only the owner can read and write; nobody else, no execute
chmod 600 config/secretos.env
chown appuser:appuser config/secretos.env
```

The question before any `chmod`: **who needs to do what with this file, exactly?** A config file with secrets doesn't need to be executable, and doesn't need to be readable by anyone except the process using it.

### 4. What the outside can reach: default-deny firewall

A firewall that starts allowing everything and closes ports one by one is a list that's always incomplete. One that starts **denying everything** and opens only what's needed doesn't have that problem — what you didn't explicitly open simply doesn't exist from the outside.

```bash
# ufw: deny all incoming by default, allow only what is needed
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp      # SSH
ufw allow 443/tcp     # HTTPS
ufw enable
```

Notice what was **not** opened: your database port, an admin panel port, the port your local MCP server uses. If a service only needs to talk to another process on the same machine, bind it to `localhost` and don't put it in the firewall at all — it can't be reached from outside even if someone tries, because it isn't listening on the public interface.

Periodically audit what's actually listening:

```bash
ss -tulnp    # which ports are open and which process uses them
```

If something shows up that you don't recognize, that's a question to answer that same day, not next week.

### Hardening isn't a one-time event

These four doors are closed once at deployment and **checked** periodically, not forgotten: SSH access logs get checked now and then for repeated attempts, permissions on new files are checked when added, and the firewall is audited whenever a new service might have opened a port without you noticing.

## Tasks
- Configure your server to accept key-based auth only and verify a password no longer works
- Create an unprivileged user for your app and verify root can't log in over SSH
- Fix a config file with 777 permissions down to the minimum it actually needs
- Configure a default-deny firewall and audit which ports remain open with ss -tulnp

## Tip

If your answer to a permission error was chmod 777, you didn't solve the problem: you hid it. Go back and ask who needs what, exactly. It's the same least-privilege discipline you already apply to an agent's tools, applied to a file.
