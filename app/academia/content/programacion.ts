import type { Module } from '../types'

// Rama: Programación — 8 módulos.
// Cada módulo declara su `track`; la rama se deriva del track en ramas.ts.
export const MODULES_PROGRAMACION: Module[] = [
  {
    id: 'back-1',
    number: 1,
    title: 'Back-end con Python y FastAPI',
    description: 'Construye la API que sostiene tu producto: endpoints, validación, estructura por dominios y documentación que se escribe sola.',
    duration: '4 semanas',
    status: 'available',
    track: 'backend',
    audience: 'aprendizaje',
    lessons: [
      {
        id: 'b1-l1',
        title: 'Qué hace un back-end y cómo se organiza',
        type: 'reading',
        difficulty: 'intermedio',
        content: `## El reparto de responsabilidades

El front-end muestra y recoge. El back-end decide, guarda y protege. La línea que los separa no es estética: **todo lo que no puede confiarse al navegador vive en el back-end.**

Cosas que solo pueden ocurrir en el servidor:

- Guardar y consultar la base de datos.
- Comprobar permisos de verdad.
- Hablar con servicios que requieren claves secretas.
- Aplicar reglas de negocio que el usuario no debe poder cambiar.

Si un cálculo de precio ocurre solo en el navegador, cualquiera puede alterarlo desde la consola. Si ocurre en el servidor, no.

### Por qué FastAPI

En el stack que ya usas, Next.js resuelve muchas APIs con sus Route Handlers, y para un sitio web suele bastar. FastAPI entra cuando el back-end necesita el ecosistema de Python: procesamiento de datos, modelos de aprendizaje automático, integración con bibliotecas de IA. Es la puerta que abrió el módulo de Python.

Sus tres razones concretas:

- **Rápido de escribir.** Un endpoint son cinco líneas.
- **Validación incluida.** Usa Pydantic, así que los datos de entrada se validan solos.
- **Documentación automática.** Genera una interfaz interactiva a partir de tu código, sin escribir nada aparte.

### El vocabulario

**Endpoint**: una dirección que responde a peticiones. \`/productos\`, \`/usuarios/42\`.

**Método HTTP**: qué se quiere hacer.

\`\`\`
GET     leer, sin efectos secundarios
POST    crear algo nuevo
PUT     reemplazar por completo
PATCH   modificar una parte
DELETE  borrar
\`\`\`

**Código de estado**: cómo salió.

\`\`\`
200  bien
201  creado
400  la petición está mal formada
401  no sé quién eres
403  sé quién eres y no puedes
404  no existe
422  los datos no pasaron la validación
500  se rompió el servidor
\`\`\`

Devolver el código correcto no es un detalle: es lo que permite al cliente reaccionar sin adivinar. Un 200 con un mensaje de error dentro obliga a inspeccionar el cuerpo de cada respuesta.

### Las arquitecturas que vas a encontrar

**Monolito.** Todo en una aplicación. Es lo correcto para empezar, y para la enorme mayoría de los proyectos. Simple de desplegar, simple de depurar.

**Servicios separados.** Cada parte del sistema es una aplicación independiente. Resuelve problemas de equipos grandes y de escala, y a cambio agrega complejidad en todo: despliegue, comunicación, seguimiento de errores.

La recomendación honesta: **empieza con un monolito.** Separar después, cuando el dolor sea real, es mucho más fácil que unir microservicios que nunca hicieron falta.

### REST en dos minutos

La convención más extendida para nombrar endpoints: recursos en plural, jerarquía en la ruta, el método dice la acción.

\`\`\`
GET    /productos           lista
POST   /productos           crear
GET    /productos/42        uno
PATCH  /productos/42        modificar
DELETE /productos/42        borrar
GET    /productos/42/reseñas   las reseñas de ese producto
\`\`\`

El error clásico es meter el verbo en la ruta: \`/crearProducto\`, \`/borrarProducto\`. El método HTTP ya dice el verbo.`,
        tasks: [
          'Toma un proyecto tuyo y lista qué operaciones deberían ocurrir en el servidor y por qué',
          'Diseña en papel los endpoints REST de una entidad real: listar, crear, leer, modificar y borrar',
          'Asigna el código de estado correcto a seis situaciones distintas de esa API',
          'Explica en dos frases por qué un cálculo de precio en el navegador no es de fiar',
        ],
        tip: 'La pregunta que ordena el diseño de cualquier API: ¿qué pasa si alguien llama a este endpoint directamente, con los datos que quiera y sin pasar por tu interfaz? Todo lo que no sobreviva a esa pregunta está mal ubicado.',
        completed: false,
      },
      {
        id: 'b1-l2',
        title: 'Tu primera API con FastAPI',
        type: 'reading',
        difficulty: 'intermedio',
        content: `## Montar el proyecto

\`\`\`bash
python3 -m venv .venv
source .venv/bin/activate        # .venv\\Scripts\\activate en Windows
pip install "fastapi[standard]"
\`\`\`

\`\`\`python
# main.py
from fastapi import FastAPI

app = FastAPI(title="API de inventario")

@app.get("/")
def raiz():
    return {"estado": "ok"}
\`\`\`

\`\`\`bash
fastapi dev main.py
\`\`\`

Ya tienes una API corriendo en \`http://127.0.0.1:8000\`. Y algo más: abre \`http://127.0.0.1:8000/docs\` y verás una interfaz donde puedes probar cada endpoint sin escribir una sola línea de cliente. Está generada a partir de tu código.

### Parámetros de ruta

\`\`\`python
@app.get("/productos/{producto_id}")
def obtener_producto(producto_id: int):
    return {"id": producto_id}
\`\`\`

El type hint \`int\` no es decorativo: FastAPI convierte el valor y, si alguien pide \`/productos/abc\`, responde 422 con un mensaje explicando el problema. No escribiste ninguna validación.

### Parámetros de consulta

\`\`\`python
@app.get("/productos")
def listar(limite: int = 20, buscar: str | None = None):
    ...
\`\`\`

Todo lo que tenga valor por defecto se convierte en parámetro de consulta: \`/productos?limite=50&buscar=laptop\`.

### Recibir un cuerpo

\`\`\`python
from pydantic import BaseModel

class ProductoNuevo(BaseModel):
    nombre: str
    precio: float
    stock: int = 0

@app.post("/productos", status_code=201)
def crear(producto: ProductoNuevo):
    return {"id": 1, **producto.model_dump()}
\`\`\`

FastAPI lee el JSON del cuerpo, lo valida contra el modelo y te entrega un objeto tipado. Si falta \`nombre\` o \`precio\` llega como texto, responde 422 sin llegar a tu función.

### Errores

\`\`\`python
from fastapi import HTTPException

@app.get("/productos/{producto_id}")
def obtener(producto_id: int):
    producto = buscar_en_db(producto_id)
    if producto is None:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return producto
\`\`\`

### Async: cuándo sí

\`\`\`python
@app.get("/productos")
async def listar():
    productos = await consultar_db()
    return productos
\`\`\`

Usa \`async def\` cuando dentro vayas a esperar algo de entrada y salida —base de datos, otra API— con \`await\`. Si tu función solo hace cálculos o usa una biblioteca que no es asíncrona, deja \`def\` normal: FastAPI la ejecuta en un hilo aparte y no bloquea.

El error habitual es poner \`async def\` en todo y luego llamar dentro a una biblioteca bloqueante. Eso sí congela el servidor.

### CORS

Si tu front-end corre en otro origen —lo normal en desarrollo— el navegador bloquea las peticiones hasta que el servidor autorice ese origen:

\`\`\`python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
\`\`\`

Nunca dejes \`allow_origins=["*"]\` junto a \`allow_credentials=True\` en producción: estarías permitiendo que cualquier sitio haga peticiones autenticadas en nombre de tus usuarios.`,
        tasks: [
          'Levanta una API con FastAPI y comprueba la documentación automática en /docs',
          'Crea los cinco endpoints REST de una entidad, con datos en memoria por ahora',
          'Provoca un 422 enviando datos inválidos y lee el mensaje que devuelve FastAPI',
          'Devuelve un 404 con HTTPException cuando el recurso no exista y compruébalo desde /docs',
        ],
        tip: 'La página /docs no es solo documentación: es tu banco de pruebas. Antes de escribir una sola línea de front-end, prueba cada endpoint ahí. Si la API se siente incómoda de usar en /docs, va a ser incómoda de consumir desde el cliente.',
        completed: false,
      },
      {
        id: 'b1-l3',
        title: 'Validar y serializar con Pydantic',
        type: 'reading',
        difficulty: 'profesional',
        content: `## La frontera del sistema

Pydantic es a Python lo que Zod a TypeScript: valida en tiempo de ejecución lo que los type hints no pueden garantizar. En FastAPI es además el mecanismo que convierte JSON en objetos y objetos en JSON.

\`\`\`python
from pydantic import BaseModel, Field, EmailStr
from datetime import datetime

class ProductoNuevo(BaseModel):
    nombre: str = Field(min_length=2, max_length=120)
    precio: float = Field(gt=0)                    # mayor que cero
    stock: int = Field(ge=0, default=0)            # mayor o igual que cero
    categoria: str | None = None
\`\`\`

Cada restricción que declaras aquí es una comprobación que no tienes que escribir dentro de la función, y un error que nunca llega a tu lógica.

### Modelos distintos para entrada y salida

Este es el patrón que más importa y el que más se olvida. **Lo que entra no es lo mismo que lo que sale.**

\`\`\`python
class UsuarioNuevo(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8)     # entra

class UsuarioPublico(BaseModel):
    id: int
    email: EmailStr
    creado_en: datetime                     # sale — sin contraseña

@app.post("/usuarios", response_model=UsuarioPublico, status_code=201)
def crear(datos: UsuarioNuevo):
    usuario = guardar(datos)
    return usuario
\`\`\`

\`response_model\` **filtra la respuesta**: aunque tu función devuelva un objeto con la contraseña dentro, FastAPI solo serializa los campos declarados en \`UsuarioPublico\`. Es una red de seguridad contra la fuga de datos más común de todas.

### Validaciones propias

\`\`\`python
from pydantic import field_validator, model_validator

class Reserva(BaseModel):
    inicio: datetime
    fin: datetime

    @field_validator("inicio")
    @classmethod
    def no_en_el_pasado(cls, v: datetime) -> datetime:
        if v < datetime.now():
            raise ValueError("La reserva no puede empezar en el pasado")
        return v

    @model_validator(mode="after")
    def fin_despues_de_inicio(self):
        if self.fin <= self.inicio:
            raise ValueError("La fecha de fin debe ser posterior al inicio")
        return self
\`\`\`

\`field_validator\` valida un campo suelto; \`model_validator\` valida relaciones entre campos, que es donde viven las reglas de negocio de verdad.

### Modelos para actualizaciones parciales

\`\`\`python
class ProductoActualizar(BaseModel):
    nombre: str | None = None
    precio: float | None = None
    stock: int | None = None

@app.patch("/productos/{producto_id}")
def actualizar(producto_id: int, cambios: ProductoActualizar):
    datos = cambios.model_dump(exclude_unset=True)   # solo lo que vino
    ...
\`\`\`

\`exclude_unset=True\` distingue entre "no me mandaron este campo" y "me lo mandaron como null". Sin eso, un PATCH borraría todos los campos que el cliente no envió.

### Configuración desde variables de entorno

\`\`\`python
from pydantic_settings import BaseSettings

class Config(BaseSettings):
    database_url: str
    secret_key: str
    debug: bool = False

    class Config:
        env_file = ".env"

config = Config()
\`\`\`

Si falta una variable obligatoria, la aplicación **no arranca** y te dice cuál. Es infinitamente mejor que descubrirlo en producción cuando alguien pulsa el botón que la usa.`,
        tasks: [
          'Define modelos separados de entrada y salida para una entidad que tenga un campo sensible',
          'Comprueba con response_model que el campo sensible no aparece aunque tu función lo devuelva',
          'Escribe un model_validator que valide una regla entre dos campos',
          'Implementa un PATCH con exclude_unset y verifica que no borra los campos ausentes',
        ],
        tip: 'Usar el mismo modelo para entrada y salida es la causa número uno de filtrar contraseñas y datos internos en una API. Sepáralos desde el primer endpoint, aunque al principio parezcan idénticos: dejan de serlo antes de lo que crees.',
        completed: false,
      },
      {
        id: 'b1-l4',
        title: 'Estructura: separar por dominios y responsabilidades',
        type: 'reading',
        difficulty: 'profesional',
        content: `## Cuando main.py deja de servir

Un archivo funciona hasta los quince endpoints. Después nadie encuentra nada y cada cambio toca el mismo archivo que están tocando los demás.

### La estructura que aguanta

\`\`\`
app/
├── main.py              # crea la aplicación y monta los routers
├── config.py            # configuración desde variables de entorno
├── database.py          # conexión a la base
├── productos/
│   ├── router.py        # los endpoints
│   ├── schemas.py       # los modelos de Pydantic
│   ├── models.py        # las tablas
│   └── service.py       # la lógica de negocio
└── usuarios/
    └── ...
\`\`\`

**Se agrupa por dominio, no por tipo de archivo.** Una carpeta \`routers/\` con veinte archivos y otra \`schemas/\` con veinte más obliga a saltar entre carpetas para tocar una sola funcionalidad. Con la estructura de arriba, todo lo de productos está junto.

### Los routers

\`\`\`python
# productos/router.py
from fastapi import APIRouter

router = APIRouter(prefix="/productos", tags=["productos"])

@router.get("")
def listar():
    ...

@router.get("/{producto_id}")
def obtener(producto_id: int):
    ...
\`\`\`

\`\`\`python
# main.py
from fastapi import FastAPI
from productos.router import router as productos_router
from usuarios.router import router as usuarios_router

app = FastAPI()
app.include_router(productos_router)
app.include_router(usuarios_router)
\`\`\`

El \`tags\` agrupa los endpoints en la documentación automática, que con veinte endpoints se agradece mucho.

### Las tres capas

**Router**: recibe la petición, valida con Pydantic, llama al servicio, devuelve. No lleva lógica de negocio.

**Service**: la lógica. No sabe nada de HTTP. Esto es lo que hace que puedas probarlo sin levantar un servidor.

**Model / repositorio**: el acceso a datos.

\`\`\`python
# productos/service.py — sin una sola referencia a HTTP
def calcular_precio_final(producto, cupon=None):
    precio = producto.precio
    if cupon and cupon.es_valido():
        precio *= (1 - cupon.descuento)
    return round(precio, 2)
\`\`\`

\`\`\`python
# productos/router.py
@router.get("/{producto_id}/precio")
def precio(producto_id: int):
    producto = obtener_o_404(producto_id)
    return {"precio": calcular_precio_final(producto)}
\`\`\`

La prueba de que la separación está bien hecha: **tus pruebas de la lógica de negocio no importan nada de FastAPI.**

### Dependencias

FastAPI resuelve con inyección de dependencias lo que se repite en muchos endpoints:

\`\`\`python
from fastapi import Depends

def usuario_actual(token: str = Depends(leer_token)):
    usuario = decodificar(token)
    if usuario is None:
        raise HTTPException(status_code=401, detail="No autorizado")
    return usuario

@router.post("/productos")
def crear(producto: ProductoNuevo, usuario = Depends(usuario_actual)):
    ...
\`\`\`

La comprobación de sesión se escribe una vez y se declara donde haga falta. Además aparece en la documentación automática como requisito del endpoint.`,
        tasks: [
          'Reorganiza una API de un solo archivo en carpetas por dominio',
          'Extrae la lógica de negocio a un service que no importe nada de FastAPI',
          'Escribe una prueba de ese service sin levantar el servidor',
          'Crea una dependencia de usuario actual y aplícala a los endpoints que la necesiten',
        ],
        tip: 'La señal de que la lógica está en el lugar correcto: puedes probarla llamando a una función normal, sin cliente HTTP, sin levantar nada. Si para probar una regla de negocio necesitas hacer una petición, la regla está atrapada dentro del router.',
        completed: false,
      },
      {
        id: 'b1-l5',
        title: 'Documentar y probar la API',
        type: 'reading',
        difficulty: 'profesional',
        content: `## La documentación ya existe

FastAPI genera un esquema OpenAPI a partir de tus tipos y modelos, y lo sirve en dos interfaces: \`/docs\` y \`/redoc\`. No hay que mantenerla aparte, así que nunca se queda vieja.

Lo que sí conviene añadir para que sea útil de verdad:

\`\`\`python
@router.post(
    "",
    status_code=201,
    summary="Crear un producto",
    description="Crea un producto nuevo. El nombre debe ser único dentro de la categoría.",
    responses={
        409: {"description": "Ya existe un producto con ese nombre"},
    },
)
def crear(producto: ProductoNuevo):
    """El texto de aquí también aparece en la documentación."""
    ...
\`\`\`

Y ejemplos en los modelos, que es lo que convierte \`/docs\` en algo que se puede probar sin inventar datos:

\`\`\`python
class ProductoNuevo(BaseModel):
    nombre: str
    precio: float

    model_config = {
        "json_schema_extra": {
            "examples": [{"nombre": "Laptop 14 pulgadas", "precio": 1200.00}]
        }
    }
\`\`\`

### Probar los endpoints

\`\`\`bash
pip install pytest httpx
\`\`\`

\`\`\`python
# tests/test_productos.py
from fastapi.testclient import TestClient
from app.main import app

cliente = TestClient(app)

def test_crear_producto_devuelve_201():
    respuesta = cliente.post("/productos", json={"nombre": "Laptop", "precio": 1200})
    assert respuesta.status_code == 201
    assert respuesta.json()["nombre"] == "Laptop"

def test_precio_negativo_es_rechazado():
    respuesta = cliente.post("/productos", json={"nombre": "Laptop", "precio": -5})
    assert respuesta.status_code == 422

def test_producto_inexistente_devuelve_404():
    assert cliente.get("/productos/999999").status_code == 404
\`\`\`

\`TestClient\` llama a tu aplicación directamente, sin levantar un servidor ni abrir un puerto. Las pruebas corren en milisegundos.

### Qué probar en una API

Lo mismo que en el módulo de testing, aplicado aquí:

- **El camino feliz** de cada endpoint.
- **La validación**: datos inválidos devuelven 422.
- **Los permisos**: sin sesión da 401, con sesión ajena da 403.
- **Los casos límite**: recurso inexistente, lista vacía, valores en el borde.

Y sobre todo: **la lógica de negocio se prueba en el service**, con funciones normales. Las pruebas de endpoint comprueban el cableado —rutas, códigos, validación, permisos—, no las reglas.

### Base de datos en las pruebas

Nunca contra la base real. Las dos opciones sanas:

\`\`\`python
# 1. una base de prueba que se crea y destruye en cada ejecución
# 2. sustituir la dependencia de base de datos por una falsa
app.dependency_overrides[get_db] = get_db_de_prueba
\`\`\`

\`dependency_overrides\` es una de las mejores ideas de FastAPI: sustituye cualquier dependencia en las pruebas sin tocar el código de producción.`,
        tasks: [
          'Agrega summary, description y un ejemplo a tres endpoints y revisa cómo queda /docs',
          'Escribe pruebas con TestClient para el camino feliz, la validación y el 404 de una entidad',
          'Sustituye la dependencia de base de datos con dependency_overrides en las pruebas',
          'Corre las pruebas y comprueba que no necesitan que el servidor esté levantado',
        ],
        tip: 'Si tienes que explicarle a alguien cómo usar tu API por mensaje, es que a /docs le faltan descripciones y ejemplos. Una API bien documentada se consume sin preguntarle nada a quien la escribió.',
        completed: false,
      },
      {
        id: 'b1-l6',
        title: 'Proyecto: API de inventario en producción',
        type: 'project',
        difficulty: 'profesional',
        projectBrief: `Vas a construir la API completa de un sistema de inventario para un negocio real —puede ser el de un cliente tuyo o uno inventado con datos realistas— y dejarla desplegada y documentada.

El escenario: un negocio necesita controlar productos, proveedores y movimientos de stock. Varias personas la usan, así que hay que distinguir quién puede leer de quién puede modificar.

Este proyecto es la base sobre la que van a montarse los dos módulos siguientes: en el de bases de datos le pondrás persistencia real con relaciones, y en el de Docker lo empaquetarás para que corra igual en cualquier máquina. Constrúyelo pensando en eso.`,
        deliverables: [
          'API con FastAPI y los endpoints REST de productos, proveedores y movimientos de stock',
          'Modelos de Pydantic separados para entrada y salida, con response_model en cada endpoint',
          'Estructura por dominios con las tres capas: router, service y acceso a datos',
          'Autenticación por token y una dependencia que distinga lectura de escritura',
          'Documentación en /docs con descripciones y ejemplos en todos los endpoints',
          'Pruebas con TestClient: camino feliz, validación, permisos y casos límite',
          'README con instrucciones para levantarla desde cero',
        ],
        rubrica: [
          'Los cinco métodos REST están implementados y devuelven el código de estado correcto en cada caso',
          'Ningún endpoint devuelve campos sensibles: se comprueba que response_model los filtra',
          'La lógica de negocio vive en services y se puede probar sin cliente HTTP',
          'Un PATCH con exclude_unset no borra los campos que no se enviaron',
          'Sin token, los endpoints de escritura responden 401; con token sin permisos, 403',
          'Las pruebas corren con un solo comando y no tocan la base de datos real',
          'La configuración llega por variables de entorno y la aplicación no arranca si falta alguna',
          'En /docs se puede ejecutar cada endpoint sin tener que inventar el formato de los datos',
        ],
        tasks: [
          'Diseña los endpoints y los modelos de entrada y salida antes de escribir código',
          'Monta la estructura por dominios desde el principio, aunque al inicio parezca excesiva',
          'Implementa productos completo, con pruebas, antes de pasar a proveedores',
          'Agrega autenticación por token con una dependencia reutilizable',
          'Prueba cada endpoint desde /docs como si fueras alguien externo consumiéndola',
        ],
        discussionPrompts: [
          '¿Qué debe pasar si se intenta borrar un proveedor que tiene productos asociados? ¿Error, borrado en cascada o marcarlo como inactivo?',
          '¿Un movimiento de stock debería poder editarse, o solo corregirse con otro movimiento en sentido contrario?',
        ],
        tip: 'Empieza con datos en memoria, sin base de datos. Suena a atajo pero es lo correcto: te obliga a definir bien la forma de la API y sus contratos antes de mezclarlos con problemas de persistencia. La base entra en el módulo siguiente y encaja sin reescribir los endpoints.',
        completed: false,
      },
      {
        id: 'b1-l7',
        title: 'Examen: back-end y FastAPI',
        type: 'exam',
        difficulty: 'profesional',
        questions: [
          {
            q: 'Tu API devuelve un objeto Usuario que incluye el hash de la contraseña. ¿Qué mecanismo de FastAPI impide que llegue al cliente?',
            options: [
              'El type hint del valor de retorno de la función',
              'Declarar response_model con un modelo que no incluya ese campo: FastAPI serializa solo los campos declarados',
              'Marcar el campo como privado con un guion bajo delante',
              'Ninguno: hay que quitarlo a mano antes de devolver el objeto',
            ],
            correct: 1,
            explanation: 'response_model actúa como filtro de salida: aunque la función devuelva un objeto con campos de más, FastAPI serializa únicamente lo declarado en ese modelo. Por eso conviene tener modelos separados de entrada y salida desde el primer endpoint.',
          },
          {
            q: 'En un endpoint PATCH, ¿qué problema resuelve model_dump(exclude_unset=True)?',
            options: [
              'Convierte el modelo a JSON más rápido',
              'Distingue entre un campo que no se envió y uno enviado como null, evitando borrar lo que el cliente no tocó',
              'Excluye los campos que no pasaron la validación',
              'Elimina los campos sensibles de la respuesta',
            ],
            correct: 1,
            explanation: 'En un modelo de actualización todos los campos son opcionales con valor por defecto None. Sin exclude_unset, los campos ausentes llegarían como None y sobrescribirían los valores existentes con nulos. Con él solo obtienes lo que realmente se envió.',
          },
          {
            q: '¿Cuándo conviene declarar un endpoint como async def?',
            options: [
              'Siempre: es más rápido en todos los casos',
              'Cuando dentro se espera con await una operación de entrada y salida, como una consulta a la base o a otra API',
              'Solo cuando el endpoint devuelve muchos datos',
              'Nunca en FastAPI, se maneja automáticamente',
            ],
            correct: 1,
            explanation: 'async def tiene sentido cuando hay awaits reales de entrada/salida. Si la función solo calcula o llama a una biblioteca bloqueante, es mejor def normal: FastAPI la ejecuta en un hilo aparte. Declarar async y luego llamar dentro a algo bloqueante es peor que no usar async, porque sí congela el bucle de eventos.',
          },
          {
            q: '¿Por qué la lógica de negocio debe vivir en un service y no en el router?',
            options: [
              'Porque los routers tienen un límite de líneas en FastAPI',
              'Porque un service no sabe nada de HTTP, así que se puede probar llamando funciones normales sin levantar un servidor',
              'Porque mejora el rendimiento de las peticiones',
              'Porque FastAPI no permite calcular dentro de un router',
            ],
            correct: 1,
            explanation: 'Separar la lógica del transporte es lo que la hace verificable y reutilizable. Si para probar una regla de precios necesitas hacer una petición HTTP, esa regla está atrapada en la capa equivocada. La prueba de que la separación está bien: los tests de negocio no importan nada de FastAPI.',
          },
          {
            q: 'Un cliente envía un producto con precio -5 y tu modelo declara precio: float = Field(gt=0). ¿Qué ocurre?',
            options: [
              'La función se ejecuta y hay que comprobar el valor dentro',
              'FastAPI responde 422 con el detalle del campo que falló, sin llegar a ejecutar tu función',
              'El valor se convierte automáticamente a 0',
              'Se lanza una excepción 500',
            ],
            correct: 1,
            explanation: 'La validación de Pydantic ocurre antes de entrar a tu función. Un dato que no cumple el esquema produce un 422 con la ruta del campo y el motivo, y tu lógica nunca ve datos inválidos: es la razón principal para declarar las restricciones en el modelo en vez de comprobarlas a mano.',
          },
          {
            q: 'Estás escribiendo pruebas de tu API. ¿Qué hace dependency_overrides?',
            options: [
              'Desactiva la autenticación durante las pruebas',
              'Sustituye una dependencia por otra solo en las pruebas, sin modificar el código de producción',
              'Cambia las rutas de los endpoints para no chocar con el servidor real',
              'Genera datos de prueba automáticamente a partir de los modelos',
            ],
            correct: 1,
            explanation: 'Permite reemplazar cualquier dependencia declarada con Depends —la sesión de base de datos, el usuario actual— por una versión de prueba. Así los tests no tocan la base real ni necesitan credenciales, y el código de producción queda intacto.',
          },
        ],
        completed: false,
      },
    ],
    resources: [
      {
        title: 'FastAPI — documentación oficial',
        url: 'https://fastapi.tiangolo.com/es/',
        type: 'documentation',
      },
      {
        title: 'Pydantic — documentación de modelos y validación',
        url: 'https://docs.pydantic.dev/latest/',
        type: 'documentation',
      },
      {
        title: 'MDN — Códigos de estado HTTP',
        url: 'https://developer.mozilla.org/es/docs/Web/HTTP/Status',
        type: 'documentation',
      },
      {
        title: 'Full Stack FastAPI Template — estructura de referencia',
        url: 'https://github.com/fastapi/full-stack-fastapi-template',
        type: 'tool',
      },
    ],
  },
  {
    id: 'back-2',
    number: 2,
    title: 'Bases de datos relacionales: modelado, SQL y ORM',
    description: 'Diseñar bien las tablas, consultarlas con SQL y hacerlas evolucionar sin perder datos ni romper lo que ya funciona.',
    duration: '4 semanas',
    status: 'available',
    track: 'backend',
    audience: 'aprendizaje',
    lessons: [
      {
        id: 'b2-l1',
        title: 'Modelar datos: entidades, relaciones y claves',
        type: 'reading',
        difficulty: 'intermedio',
        content: `## El diseño se paga o se sufre

Un mal modelo de datos no se nota el primer mes. Se nota cuando hay diez mil registros, tres funcionalidades construidas encima y cambiar una tabla implica migrar todo. **Es la decisión más cara de revertir de un proyecto**, más que el framework o el lenguaje.

### Entidades y atributos

Una entidad es una cosa del mundo real sobre la que guardas información: un producto, un cliente, un pedido. Se convierte en una tabla; cada atributo, en una columna; cada instancia, en una fila.

\`\`\`
productos
├── id          clave primaria
├── nombre
├── precio
├── stock
└── creado_en
\`\`\`

### Claves

**Clave primaria**: identifica una fila de forma única. Usa un \`id\` sin significado de negocio —un entero autoincremental o un UUID— y no el correo ni el código del producto. Los datos de negocio cambian; los identificadores no deberían.

**Clave foránea**: apunta a la clave primaria de otra tabla. Es lo que crea la relación y lo que impide que existan referencias a filas que no existen.

### Los tres tipos de relación

**Uno a muchos.** La más común. Un proveedor tiene muchos productos; cada producto tiene un proveedor. La clave foránea va en el lado "muchos":

\`\`\`
proveedores               productos
├── id  ←──────────────── ├── proveedor_id
└── nombre                ├── nombre
                          └── precio
\`\`\`

**Muchos a muchos.** Un producto puede estar en muchos pedidos y un pedido tener muchos productos. Necesita una **tabla intermedia**, y esa tabla suele tener datos propios:

\`\`\`
pedidos      pedido_items              productos
├── id  ←─── ├── pedido_id   ────→ ─── ├── id
└── fecha    ├── producto_id           └── nombre
             ├── cantidad
             └── precio_unitario
\`\`\`

Fíjate en \`precio_unitario\`: guarda el precio **en el momento de la compra**. Si solo apuntaras al producto, subir el precio mañana cambiaría el total de todos los pedidos históricos. Este es el tipo de detalle que separa un modelo pensado de uno improvisado.

**Uno a uno.** Poco frecuente. Suele indicar que las dos tablas deberían ser una, salvo que separes por seguridad o porque una parte se consulta muy poco.

### Normalizar: no repitas datos

Si el nombre del proveedor está escrito en cada fila de productos, el día que cambie hay que actualizar mil filas y alguna se quedará vieja. La regla práctica: **cada dato vive en un solo lugar**, y el resto lo referencia.

La excepción son los datos históricos, como el precio del ejemplo anterior: ahí sí quieres una copia congelada.

### Tipos de columna

Elegir bien evita problemas silenciosos:

\`\`\`sql
id            bigserial / uuid
texto corto   varchar(255)
texto largo   text
dinero        numeric(10,2)      -- nunca float
enteros       integer / bigint
sí o no       boolean
fecha y hora  timestamptz        -- con zona horaria
estructurado  jsonb
\`\`\`

**Nunca uses \`float\` para dinero.** \`0.1 + 0.2\` no da \`0.3\` en coma flotante, y esos céntimos perdidos aparecen como descuadres en los totales. \`numeric\` es exacto.

**Usa \`timestamptz\`, no \`timestamp\`.** Sin zona horaria, un pedido hecho a las 23:00 en México aparece con otra fecha para un cliente en España.

### Restricciones: que la base defienda las reglas

\`\`\`sql
CREATE TABLE productos (
  id          bigserial PRIMARY KEY,
  nombre      varchar(120) NOT NULL,
  precio      numeric(10,2) NOT NULL CHECK (precio > 0),
  stock       integer NOT NULL DEFAULT 0 CHECK (stock >= 0),
  proveedor_id bigint REFERENCES proveedores(id) ON DELETE RESTRICT,
  creado_en   timestamptz NOT NULL DEFAULT now(),
  UNIQUE (nombre, proveedor_id)
);
\`\`\`

Cada restricción es una regla que **no se puede saltar desde ningún sitio**: ni desde un error en tu código, ni desde un script suelto, ni desde alguien tocando la base a mano. Es la última línea de defensa, y la única que no depende de que nadie se olvide.

\`ON DELETE RESTRICT\` impide borrar un proveedor que tenga productos. Las alternativas son \`CASCADE\` (borra los productos también, peligroso) y \`SET NULL\`.`,
        tasks: [
          'Modela en papel un negocio real con al menos cuatro entidades y sus relaciones',
          'Identifica la relación muchos a muchos y define qué datos propios lleva su tabla intermedia',
          'Escribe el CREATE TABLE de dos de esas tablas con NOT NULL, CHECK y clave foránea',
          'Localiza un dato que deba congelarse por ser histórico y explica por qué no basta con referenciarlo',
        ],
        tip: 'Antes de escribir una línea de SQL, dibuja las tablas y las flechas entre ellas en papel. Diez minutos ahí ahorran semanas después: cambiar el modelo con datos en producción es de lo más caro que se puede hacer en un proyecto.',
        completed: false,
      },
      {
        id: 'b2-l2',
        title: 'SQL: lo que vas a escribir todos los días',
        type: 'reading',
        difficulty: 'intermedio',
        content: `## Consultar

\`\`\`sql
SELECT nombre, precio FROM productos;

SELECT * FROM productos
WHERE precio > 100 AND stock > 0
ORDER BY precio DESC
LIMIT 20;
\`\`\`

Filtros que se usan a diario:

\`\`\`sql
WHERE categoria IN ('laptops', 'monitores')
WHERE nombre ILIKE '%laptop%'          -- sin distinguir mayúsculas
WHERE proveedor_id IS NULL             -- NULL se compara con IS, nunca con =
WHERE creado_en >= now() - interval '30 days'
\`\`\`

\`NULL\` no es igual a nada, ni siquiera a sí mismo. \`WHERE proveedor_id = NULL\` no devuelve filas nunca. Es de los errores que más tiempo hacen perder.

### JOIN: unir tablas

\`\`\`sql
SELECT p.nombre, pr.nombre AS proveedor
FROM productos p
JOIN proveedores pr ON pr.id = p.proveedor_id;
\`\`\`

\`INNER JOIN\` (o solo \`JOIN\`) devuelve las filas que **casan en las dos** tablas. Un producto sin proveedor no aparece.

\`LEFT JOIN\` devuelve **todas las de la izquierda**, con nulos donde no haya pareja:

\`\`\`sql
SELECT p.nombre, pr.nombre AS proveedor
FROM productos p
LEFT JOIN proveedores pr ON pr.id = p.proveedor_id;
\`\`\`

La regla mental: si necesitas ver también lo que no tiene relación, \`LEFT JOIN\`. Si solo te interesan los emparejados, \`JOIN\`.

### Agrupar y agregar

\`\`\`sql
SELECT
  pr.nombre AS proveedor,
  count(*) AS productos,
  round(avg(p.precio), 2) AS precio_medio,
  sum(p.stock) AS stock_total
FROM productos p
JOIN proveedores pr ON pr.id = p.proveedor_id
GROUP BY pr.nombre
HAVING count(*) > 3
ORDER BY productos DESC;
\`\`\`

**\`WHERE\` filtra filas antes de agrupar; \`HAVING\` filtra grupos después.** Confundirlos es el error clásico: no puedes usar \`count(*)\` en un \`WHERE\`.

### Escribir

\`\`\`sql
INSERT INTO productos (nombre, precio, proveedor_id)
VALUES ('Laptop 14', 1200.00, 3)
RETURNING id, creado_en;

UPDATE productos SET precio = 1150.00 WHERE id = 42;

DELETE FROM productos WHERE id = 42;
\`\`\`

\`RETURNING\` te devuelve los valores que generó la base —el id, la fecha— sin una segunda consulta. Es específico de Postgres y muy cómodo.

**Antes de cada UPDATE o DELETE**, ejecuta el mismo \`WHERE\` con un \`SELECT\`. Un \`DELETE\` sin \`WHERE\` borra la tabla entera y no hay deshacer.

### Índices

Sin índice, buscar por una columna obliga a leer todas las filas. Con índice, la base va directa.

\`\`\`sql
CREATE INDEX idx_productos_proveedor ON productos(proveedor_id);
\`\`\`

Qué indexar: **las columnas por las que filtras y las claves foráneas**. Qué no: todo lo demás. Cada índice acelera las lecturas y ralentiza las escrituras, además de ocupar espacio.

Para saber si una consulta usa un índice:

\`\`\`sql
EXPLAIN ANALYZE SELECT * FROM productos WHERE proveedor_id = 3;
\`\`\`

Si ves \`Seq Scan\` sobre una tabla grande, falta un índice.

### Transacciones

Cuando varias operaciones deben ocurrir todas o ninguna:

\`\`\`sql
BEGIN;
  UPDATE productos SET stock = stock - 1 WHERE id = 42;
  INSERT INTO movimientos (producto_id, tipo, cantidad) VALUES (42, 'salida', 1);
COMMIT;
\`\`\`

Si algo falla entre medias, \`ROLLBACK\` deshace todo. Sin transacción, podrías descontar el stock y no registrar el movimiento, y nadie sabría por qué no cuadra.`,
        tasks: [
          'Escribe cinco consultas sobre un modelo real: filtro, orden, JOIN, agregación y agrupación con HAVING',
          'Compara el resultado de un JOIN y un LEFT JOIN sobre la misma relación y explica la diferencia',
          'Usa EXPLAIN ANALYZE sobre una consulta, crea el índice que falta y compara el plan',
          'Escribe una operación que deba ser atómica y envuélvela en una transacción',
        ],
        tip: 'Adquiere el hábito de escribir primero el SELECT con el WHERE que vas a usar en un UPDATE o DELETE. Ver las filas afectadas antes de modificarlas convierte un error catastrófico en un susto de dos segundos.',
        completed: false,
      },
      {
        id: 'b2-l3',
        title: 'Postgres con Supabase',
        type: 'reading',
        difficulty: 'intermedio',
        content: `## Por qué Postgres

Es la base relacional por defecto del ecosistema moderno: sólida, con tipos ricos (\`jsonb\`, arreglos, rangos), extensiones para búsqueda de texto y vectores, y una comunidad enorme. Supabase la ofrece gestionada, con extras que ahorran trabajo real.

### Lo que aporta Supabase

- **Postgres gestionado**, con copias de seguridad y un editor SQL en el navegador.
- **Auth** integrado, el mismo que viste en el módulo de autenticación.
- **Row Level Security** para reglas de acceso dentro de la base.
- **Storage** para archivos.
- **API automática** sobre tus tablas, útil para prototipos.

Es Postgres de verdad: puedes conectarte con cualquier cliente y llevártelo a otro proveedor. No hay encierro.

### Conectarse desde Python

Supabase da dos cadenas de conexión y elegir mal es un problema real:

- **Conexión directa**, para migraciones y tareas administrativas.
- **Pooler**, para tu aplicación. En entornos sin servidor —Vercel, Lambda— cada petición puede abrir una conexión nueva, y Postgres tiene un límite bajo. El pooler las reutiliza y evita agotarlo.

\`\`\`python
# .env
DATABASE_URL=postgresql://usuario:clave@host:6543/postgres
\`\`\`

\`\`\`python
import os
from sqlalchemy import create_engine

engine = create_engine(os.environ["DATABASE_URL"], pool_pre_ping=True)
\`\`\`

**La cadena de conexión nunca va en el código.** Va en \`.env\`, y \`.env\` va en \`.gitignore\`.

### Row Level Security

Reglas de acceso que viven en la base y se aplican aunque tu código se equivoque:

\`\`\`sql
ALTER TABLE pedidos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "cada quien ve sus pedidos"
ON pedidos FOR SELECT
USING (auth.uid() = usuario_id);

CREATE POLICY "cada quien crea sus pedidos"
ON pedidos FOR INSERT
WITH CHECK (auth.uid() = usuario_id);
\`\`\`

\`USING\` filtra lo que se puede leer; \`WITH CHECK\` valida lo que se intenta escribir.

**El detalle que hay que entender:** al activar RLS sin políticas, la tabla queda cerrada para todos. Es el comportamiento correcto —denegar por defecto— pero sorprende la primera vez. Y las claves de servicio saltan RLS por diseño: por eso nunca deben llegar al navegador.

### Buenas prácticas de conexión

\`\`\`python
from sqlalchemy.orm import sessionmaker

SessionLocal = sessionmaker(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()          # siempre se cierra, aunque haya error
\`\`\`

En FastAPI esto se inyecta con \`Depends(get_db)\`, y es la dependencia que sustituías en las pruebas con \`dependency_overrides\`.

### Copias de seguridad

Supabase hace copias automáticas, pero **una copia que nunca has restaurado no es una copia**. Practica una restauración a un proyecto de prueba antes de necesitarla de verdad.`,
        tasks: [
          'Crea un proyecto en Supabase y define tus tablas desde el editor SQL',
          'Conéctate desde Python con la cadena del pooler y ejecuta una consulta',
          'Activa RLS en una tabla y comprueba que sin políticas no devuelve nada',
          'Escribe políticas de lectura y escritura y verifica que un usuario solo ve lo suyo',
        ],
        tip: 'Usa la conexión directa para migraciones y la del pooler para la aplicación. Si despliegas en Vercel con la conexión directa, funcionará en pruebas y empezará a fallar con tráfico real, cuando se agoten las conexiones disponibles.',
        completed: false,
      },
      {
        id: 'b2-l4',
        title: 'ORM: SQLAlchemy y cuándo conviene',
        type: 'reading',
        difficulty: 'profesional',
        content: `## Qué resuelve un ORM

Un ORM traduce entre tablas y objetos. En vez de escribir SQL y mapear resultados a mano, defines clases y trabajas con objetos.

\`\`\`python
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey, Numeric, String
from decimal import Decimal

class Base(DeclarativeBase):
    pass

class Proveedor(Base):
    __tablename__ = "proveedores"
    id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(120))
    productos: Mapped[list["Producto"]] = relationship(back_populates="proveedor")

class Producto(Base):
    __tablename__ = "productos"
    id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(120))
    precio: Mapped[Decimal] = mapped_column(Numeric(10, 2))
    proveedor_id: Mapped[int] = mapped_column(ForeignKey("proveedores.id"))
    proveedor: Mapped[Proveedor] = relationship(back_populates="productos")
\`\`\`

Fíjate en \`Decimal\` y \`Numeric(10, 2)\` para el precio: el mismo cuidado con el dinero, ahora en el ORM.

### Consultar

\`\`\`python
from sqlalchemy import select

# todos
productos = db.scalars(select(Producto)).all()

# con filtro y orden
caros = db.scalars(
    select(Producto).where(Producto.precio > 100).order_by(Producto.precio.desc())
).all()

# uno
producto = db.get(Producto, 42)

# navegar la relación
print(producto.proveedor.nombre)
\`\`\`

### El problema N+1

Es el fallo de rendimiento más común con cualquier ORM, y es invisible hasta que la tabla crece:

\`\`\`python
productos = db.scalars(select(Producto)).all()   # 1 consulta
for p in productos:
    print(p.proveedor.nombre)                    # ¡una consulta por producto!
\`\`\`

Con 500 productos son 501 consultas. La solución es pedir la relación de una vez:

\`\`\`python
from sqlalchemy.orm import selectinload

productos = db.scalars(
    select(Producto).options(selectinload(Producto.proveedor))
).all()                                          # 2 consultas en total
\`\`\`

**Cómo detectarlo:** activa el registro de consultas (\`create_engine(url, echo=True)\`) y mira cuántas se ejecutan al cargar una pantalla. Si el número crece con la cantidad de filas, tienes un N+1.

### Escribir

\`\`\`python
producto = Producto(nombre="Laptop", precio=Decimal("1200.00"), proveedor_id=3)
db.add(producto)
db.commit()
db.refresh(producto)      # trae el id generado
\`\`\`

### ORM o SQL: la respuesta honesta

**El ORM gana** en las operaciones repetitivas —crear, leer por id, actualizar, borrar—, en seguridad frente a inyección SQL y en mantener el código junto a los tipos.

**El SQL gana** en informes, agregaciones complejas y cualquier consulta donde el rendimiento importe. Un informe con tres JOIN, subconsultas y ventanas es más claro en SQL que expresado a través de un ORM.

Lo sano es usar los dos. SQLAlchemy permite escribir SQL directo cuando conviene:

\`\`\`python
from sqlalchemy import text

filas = db.execute(text("""
    SELECT pr.nombre, count(*) AS total
    FROM productos p JOIN proveedores pr ON pr.id = p.proveedor_id
    GROUP BY pr.nombre ORDER BY total DESC
""")).mappings().all()
\`\`\`

**Nunca construyas SQL concatenando texto con datos del usuario.** Eso es una inyección SQL esperando a ocurrir. Usa siempre parámetros:

\`\`\`python
db.execute(text("SELECT * FROM productos WHERE nombre = :nombre"), {"nombre": entrada})
\`\`\``,
        tasks: [
          'Define con SQLAlchemy dos modelos relacionados y sus relationship en ambos sentidos',
          'Activa echo=True y provoca un N+1 a propósito, contando las consultas',
          'Resuélvelo con selectinload y compara el número de consultas',
          'Escribe un informe con agregaciones en SQL directo, usando parámetros y no concatenación',
        ],
        tip: 'El N+1 no se ve en desarrollo con diez filas de prueba: aparece en producción con miles. Acostúmbrate a mirar el número de consultas que dispara cada pantalla, no solo si funciona.',
        completed: false,
      },
      {
        id: 'b2-l5',
        title: 'Migraciones: hacer evolucionar la base sin romper nada',
        type: 'reading',
        difficulty: 'profesional',
        content: `## El problema

Tu modelo cambia: hace falta una columna nueva. En desarrollo la agregas a mano y sigues. Pero la base de producción ya tiene datos, y tus compañeros tienen la suya. ¿Cómo se aplica el mismo cambio en todas, en el mismo orden, sin perder nada?

Una **migración** es un archivo versionado que describe un cambio de esquema. Se guardan en el repositorio y se aplican en orden. Son el control de versiones de tu base de datos.

### Alembic

\`\`\`bash
pip install alembic
alembic init migrations
\`\`\`

\`\`\`bash
# generar la migración comparando modelos contra la base
alembic revision --autogenerate -m "agrega categoria a productos"

# aplicar
alembic upgrade head

# deshacer la última
alembic downgrade -1
\`\`\`

### Revisa siempre lo autogenerado

\`--autogenerate\` detecta la mayoría de los cambios, pero **no todos**, y a veces propone cosas peligrosas. Abre el archivo antes de aplicarlo:

\`\`\`python
def upgrade():
    op.add_column("productos", sa.Column("categoria", sa.String(60), nullable=True))

def downgrade():
    op.drop_column("productos", "categoria")
\`\`\`

Lo que suele fallar: renombrar una columna se detecta como borrar una y crear otra —lo que **pierde los datos**—, y los cambios de tipo o de restricciones a veces no se detectan.

### Agregar una columna obligatoria con datos existentes

No puedes añadir una columna \`NOT NULL\` a una tabla con filas: no hay valor para las existentes. Se hace en tres pasos:

\`\`\`python
def upgrade():
    # 1. agregar como opcional
    op.add_column("productos", sa.Column("categoria", sa.String(60), nullable=True))
    # 2. rellenar las filas existentes
    op.execute("UPDATE productos SET categoria = 'general' WHERE categoria IS NULL")
    # 3. ahora sí, hacerla obligatoria
    op.alter_column("productos", "categoria", nullable=False)
\`\`\`

### Cambios compatibles hacia atrás

Mientras se despliega, conviven la versión vieja y la nueva del código. Una migración que rompe la versión vieja provoca errores durante el despliegue.

**Seguro:** agregar una tabla, agregar una columna opcional, agregar un índice.

**Peligroso:** borrar o renombrar una columna que el código actual todavía usa, o hacer obligatoria una columna que la versión anterior no rellena.

Para renombrar sin cortes se hace en dos despliegues: primero agregas la nueva y escribes en las dos; después, cuando ningún código usa la vieja, la borras.

### Reglas que evitan desastres

1. **Las migraciones se versionan en git**, como el código.
2. **Nunca edites una migración ya aplicada en producción.** Crea una nueva.
3. **Pruébalas en una copia** antes de tocar producción.
4. **Escribe siempre el \`downgrade\`.** El día que lo necesites, lo vas a necesitar rápido.
5. **Haz una copia de seguridad antes** de una migración destructiva.`,
        tasks: [
          'Configura Alembic sobre tu proyecto y genera la migración inicial',
          'Agrega una columna obligatoria a una tabla con datos usando los tres pasos',
          'Revisa una migración autogenerada y localiza algo que hubieras corregido a mano',
          'Aplica y deshaz una migración para comprobar que el downgrade funciona',
        ],
        tip: 'Un renombrado autogenerado casi siempre aparece como drop más add, lo que borra la columna con todos sus datos. Es la razón por la que hay que leer cada migración generada antes de aplicarla, sin excepción.',
        completed: false,
      },
      {
        id: 'b2-l6',
        title: 'Proyecto: persistencia real para la API de inventario',
        type: 'project',
        difficulty: 'profesional',
        projectBrief: `Vas a tomar la API de inventario que construiste en el módulo anterior —la que guardaba en memoria— y darle una base de datos de verdad, con relaciones, migraciones y consultas de informe.

Si los endpoints estaban bien diseñados, apenas tienes que tocarlos: cambias la capa de acceso a datos y el resto sigue igual. Comprobar eso es parte del ejercicio, y es la mejor demostración de por qué se separan las capas.`,
        deliverables: [
          'Esquema con al menos cuatro tablas, incluyendo una relación muchos a muchos con datos propios',
          'Modelos de SQLAlchemy con relaciones declaradas en ambos sentidos',
          'Migraciones con Alembic versionadas en el repositorio, incluyendo una que agregue una columna obligatoria a una tabla con datos',
          'La API del módulo anterior funcionando contra la base, con los mismos endpoints',
          'Un endpoint de informe resuelto con SQL directo y agregaciones',
          'Índices en las claves foráneas y en las columnas por las que se filtra, justificados en el README',
          'Pruebas que corren contra una base de prueba, no contra la real',
        ],
        rubrica: [
          'Los precios usan numeric y no float, y las fechas usan timestamptz',
          'Las restricciones de negocio están en la base: NOT NULL, CHECK y claves foráneas',
          'Existe al menos un dato histórico congelado, con su justificación escrita',
          'Ninguna consulta de listado dispara un N+1: se demuestra con el registro de consultas',
          'Las migraciones se aplican en una base vacía y dejan el esquema correcto',
          'Cada migración tiene su downgrade y se ha comprobado que funciona',
          'La cadena de conexión llega por variable de entorno y no está en el repositorio',
          'El endpoint de informe usa parámetros y no concatena texto con datos de entrada',
        ],
        tasks: [
          'Dibuja el modelo completo antes de escribir código, incluyendo la tabla intermedia',
          'Escribe los modelos de SQLAlchemy y genera la migración inicial con Alembic',
          'Sustituye la capa de datos en memoria por la base, sin tocar los routers',
          'Activa echo=True, carga la pantalla de listado y cuenta las consultas: corrige el N+1 si aparece',
          'Escribe el endpoint de informe en SQL y compara su claridad con la versión por ORM',
        ],
        discussionPrompts: [
          '¿Qué debería pasar con los movimientos de stock si se borra un producto? ¿Y con los pedidos históricos?',
          'Si mañana el negocio quiere manejar dos almacenes, ¿qué cambia en tu modelo y cuánto costaría esa migración?',
        ],
        tip: 'Al terminar, cuenta cuántos archivos tuviste que tocar fuera de la capa de datos. Si son pocos, tu separación por capas del módulo anterior estaba bien hecha. Si tuviste que reescribir los routers, ahí tienes la lección más valiosa del proyecto.',
        completed: false,
      },
      {
        id: 'b2-l7',
        title: 'Examen: bases de datos relacionales',
        type: 'exam',
        difficulty: 'profesional',
        questions: [
          {
            q: '¿Por qué el precio de un producto no debe guardarse con el tipo float?',
            options: [
              'Porque float ocupa más espacio que numeric',
              'Porque la coma flotante es inexacta: operaciones como 0.1 + 0.2 no dan el resultado exacto y aparecen descuadres de céntimos en los totales',
              'Porque float no admite números mayores a mil',
              'Porque Postgres no permite float en columnas indexadas',
            ],
            correct: 1,
            explanation: 'float usa representación binaria de coma flotante, que no puede representar exactamente muchos decimales. numeric guarda el valor exacto, a costa de ser algo más lento. Para dinero, la exactitud no es negociable.',
          },
          {
            q: 'En una tabla intermedia pedido_items, ¿por qué se guarda precio_unitario en vez de leer siempre el precio actual del producto?',
            options: [
              'Para que la consulta sea más rápida y no haga JOIN',
              'Porque el precio del pedido debe quedar congelado: si el producto sube de precio mañana, los pedidos históricos no deben cambiar de total',
              'Porque la clave foránea no permite acceder al precio',
              'Por una limitación de las tablas muchos a muchos',
            ],
            correct: 1,
            explanation: 'Es la excepción legítima a la regla de no duplicar datos. Un pedido es un hecho histórico: refleja lo que se cobró en su momento. Referenciar el precio actual haría que los totales del pasado cambiaran solos cada vez que se ajusta una tarifa.',
          },
          {
            q: '¿Cuál es la diferencia entre WHERE y HAVING?',
            options: [
              'Son sinónimos, HAVING es la forma antigua',
              'WHERE filtra filas antes de agrupar; HAVING filtra grupos después de agrupar, y solo ahí se pueden usar funciones de agregación',
              'WHERE se usa en SELECT y HAVING en UPDATE',
              'HAVING solo funciona con JOIN',
            ],
            correct: 1,
            explanation: 'El orden de ejecución es: WHERE filtra filas, GROUP BY agrupa, HAVING filtra los grupos resultantes. Por eso no se puede escribir WHERE count(*) > 3: en ese momento los grupos todavía no existen.',
          },
          {
            q: 'Cargas 500 productos y en el bucle accedes a producto.proveedor.nombre. ¿Qué ocurre y cómo se corrige?',
            options: [
              'Nada especial: el ORM ya trae los proveedores en la consulta inicial',
              'Se produce un N+1: una consulta por cada producto. Se corrige pidiendo la relación por adelantado con selectinload',
              'El ORM lanza un error porque la relación no está cargada',
              'Se corrige agregando un índice en proveedor_id',
            ],
            correct: 1,
            explanation: 'El ORM carga las relaciones de forma perezosa: la primera consulta trae los productos y cada acceso a .proveedor dispara otra. Son 501 consultas. selectinload le dice al ORM que traiga los proveedores en una segunda consulta única. Un índice ayuda al rendimiento de cada consulta, pero no reduce su número.',
          },
          {
            q: 'Necesitas agregar una columna NOT NULL a una tabla que ya tiene miles de filas. ¿Cómo se hace?',
            options: [
              'Directamente con ALTER TABLE ADD COLUMN ... NOT NULL',
              'En tres pasos: agregarla como opcional, rellenar las filas existentes con un valor, y después marcarla como obligatoria',
              'Borrando la tabla y recreándola con la columna incluida',
              'No se puede: hay que dejarla siempre opcional',
            ],
            correct: 1,
            explanation: 'Una columna NOT NULL sin valor por defecto no puede agregarse a filas existentes, porque no habría qué poner en ellas. La secuencia segura es nullable, UPDATE de relleno y luego alter a NOT NULL, todo dentro de la misma migración.',
          },
          {
            q: 'Activas Row Level Security en una tabla y de pronto no devuelve ninguna fila. ¿Qué pasó?',
            options: [
              'Se borraron los datos al activar RLS',
              'Al activar RLS sin políticas definidas, la tabla queda cerrada por defecto: hay que declarar explícitamente qué se permite',
              'RLS solo funciona en tablas vacías',
              'Falta crear un índice para que RLS pueda filtrar',
            ],
            correct: 1,
            explanation: 'RLS deniega por defecto, que es el comportamiento correcto desde el punto de vista de seguridad: nada es accesible hasta que una política lo permita. Sorprende la primera vez, pero es preferible a lo contrario. Las claves de servicio saltan RLS, y por eso nunca deben llegar al navegador.',
          },
        ],
        completed: false,
      },
    ],
    resources: [
      {
        title: 'PostgreSQL — documentación oficial',
        url: 'https://www.postgresql.org/docs/current/',
        type: 'documentation',
      },
      {
        title: 'Supabase — guías de base de datos',
        url: 'https://supabase.com/docs/guides/database/overview',
        type: 'documentation',
      },
      {
        title: 'SQLAlchemy 2.0 — tutorial oficial',
        url: 'https://docs.sqlalchemy.org/en/20/tutorial/',
        type: 'documentation',
      },
      {
        title: 'Alembic — migraciones',
        url: 'https://alembic.sqlalchemy.org/en/latest/tutorial.html',
        type: 'documentation',
      },
      {
        title: 'Use The Index, Luke — índices explicados a fondo',
        url: 'https://use-the-index-luke.com/es',
        type: 'article',
      },
    ],
  },
  {
    id: 'back-3',
    number: 3,
    title: 'Contenedores con Docker',
    description: 'Empaquetar la aplicación con todo lo que necesita para que corra igual en tu máquina, en la de tu socio y en el servidor.',
    duration: '2 semanas',
    status: 'available',
    track: 'backend',
    audience: 'capacitacion',
    lessons: [
      {
        id: 'b3-l1',
        title: 'Qué problema resuelve un contenedor',
        type: 'reading',
        difficulty: 'intermedio',
        content: `## "En mi máquina funciona"

Tu proyecto corre con Python 3.12 y Postgres 16. La máquina de tu socio tiene Python 3.9. El servidor tiene otra versión de una biblioteca del sistema. El mismo código se comporta distinto en los tres sitios y nadie sabe por qué.

Un **contenedor** empaqueta la aplicación junto con su versión exacta de lenguaje, sus dependencias y su configuración. Lo que se ejecuta es el paquete completo, así que se comporta igual en todas partes.

### No es una máquina virtual

Una máquina virtual emula un ordenador entero, con su propio sistema operativo: pesa gigas y tarda minutos en arrancar. Un contenedor comparte el núcleo del sistema anfitrión y solo aísla los procesos y los archivos: pesa megas y arranca en segundos.

Esa diferencia es lo que hace viable levantar cinco servicios a la vez en tu portátil.

### Los tres conceptos

**Imagen**: la plantilla, de solo lectura. Contiene el sistema base, tu código y sus dependencias.

**Contenedor**: una instancia de una imagen en ejecución. De una imagen puedes levantar muchos contenedores.

**Registro**: donde se guardan y comparten las imágenes. Docker Hub es el público.

La analogía que funciona: la imagen es la clase, el contenedor es la instancia.

### Los comandos del día a día

\`\`\`bash
docker build -t mi-api .          # construir una imagen desde el Dockerfile
docker run -p 8000:8000 mi-api    # levantar un contenedor
docker ps                         # ver los que están corriendo
docker ps -a                      # ver todos, incluidos los detenidos
docker logs <id>                  # ver su salida
docker exec -it <id> bash         # entrar dentro
docker stop <id>
docker rm <id>
docker image prune -a             # liberar espacio de imágenes sin usar
\`\`\`

\`-p 8000:8000\` conecta el puerto 8000 de tu máquina con el 8000 del contenedor. Sin eso, el servicio corre pero no lo alcanzas: es el motivo número uno de "levanté el contenedor y no responde".

### Lo que se pierde al parar un contenedor

Todo lo que escribió dentro. Un contenedor es desechable por diseño. Si tu base de datos vive en un contenedor sin volumen, al pararlo pierdes los datos.

\`\`\`bash
docker run -v datos_pg:/var/lib/postgresql/data postgres:16
\`\`\`

Un **volumen** es almacenamiento que sobrevive al contenedor. Toda base de datos en Docker necesita uno.

### Cuándo usarlo y cuándo no

**Sí**: cuando el proyecto tiene varias piezas (API, base, cache), cuando el equipo trabaja en sistemas distintos, cuando el despliegue debe ser reproducible.

**No hace falta**: para un sitio estático o un Next.js que despliegas en Vercel. Vercel ya resuelve el entorno; meter Docker ahí es complejidad sin retorno.`,
        tasks: [
          'Instala Docker y levanta un contenedor de Postgres con un volumen',
          'Conéctate a esa base desde tu máquina y crea una tabla',
          'Para el contenedor, vuelve a levantarlo y comprueba que la tabla sigue ahí',
          'Repite sin volumen y comprueba que los datos se pierden',
        ],
        tip: 'La confusión más común al empezar es entre imagen y contenedor. Si te equivocas de comando, recuerda: build y pull actúan sobre imágenes; run, stop, logs y exec actúan sobre contenedores.',
        completed: false,
      },
      {
        id: 'b3-l2',
        title: 'Dockerfile: construir tu propia imagen',
        type: 'reading',
        difficulty: 'profesional',
        content: `## El archivo

Un \`Dockerfile\` es la receta de tu imagen: instrucciones que se ejecutan en orden.

\`\`\`dockerfile
FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000
CMD ["fastapi", "run", "main.py", "--port", "8000"]
\`\`\`

### El orden importa más de lo que parece

Cada instrucción crea una capa que Docker guarda en caché. Si una capa no cambió, reutiliza todo lo anterior.

Por eso **primero se copia \`requirements.txt\` y se instala, y solo después el resto del código**. Al cambiar una línea de tu programa, Docker reutiliza la capa de dependencias y la construcción tarda segundos. Si copiaras todo de golpe antes de instalar, cada cambio en el código reinstalaría todas las dependencias.

### .dockerignore

\`\`\`
.git
.venv
__pycache__
*.pyc
.env
node_modules
tests
\`\`\`

Sin este archivo, \`COPY . .\` mete dentro de la imagen tu entorno virtual, el historial de git y —lo importante— **tu archivo \`.env\` con las claves**. Es el mismo cuidado que con \`.gitignore\`, y se olvida con la misma frecuencia.

### Imagen base: elige pequeña

\`\`\`
python:3.12          ~1 GB    todo incluido
python:3.12-slim     ~150 MB  lo justo — la opción por defecto sensata
python:3.12-alpine   ~50 MB   muy pequeña, pero con una librería de C distinta
                              que rompe algunos paquetes científicos
\`\`\`

Empieza con \`slim\`. Alpine solo si el tamaño importa de verdad y comprobaste que tus dependencias compilan.

### Construcción en varias etapas

Para compilar hacen falta herramientas que en producción sobran. Se usan en una etapa y se descartan:

\`\`\`dockerfile
FROM python:3.12-slim AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt

FROM python:3.12-slim
WORKDIR /app
COPY --from=builder /root/.local /root/.local
COPY . .
ENV PATH=/root/.local/bin:$PATH
CMD ["fastapi", "run", "main.py", "--port", "8000"]
\`\`\`

La imagen final solo lleva lo necesario para ejecutar.

### No corras como root

Por defecto el proceso dentro del contenedor es root. Si alguien consigue ejecutar código, tiene más privilegios de los que necesita:

\`\`\`dockerfile
RUN useradd --create-home appuser
USER appuser
\`\`\`

### Las variables de entorno no van dentro

\`\`\`dockerfile
# MAL: la clave queda grabada en la imagen y en su historial
ENV DATABASE_URL=postgresql://usuario:clave@host/db
\`\`\`

Las claves se pasan al **ejecutar**, no al construir:

\`\`\`bash
docker run --env-file .env mi-api
\`\`\`

Una imagen con secretos dentro es un secreto publicado en cuanto la subes a un registro. Y borrarlo de la capa no sirve: queda en el historial de la imagen.`,
        tasks: [
          'Escribe el Dockerfile de tu API y construye la imagen',
          'Agrega un .dockerignore y compara el tamaño de la imagen antes y después',
          'Cambia una línea de código y comprueba que la reconstrucción reutiliza la capa de dependencias',
          'Pasa la configuración con --env-file y verifica que no hay secretos dentro de la imagen',
        ],
        tip: 'Si tu imagen tarda varios minutos en reconstruirse tras cambiar una línea de código, el orden de las instrucciones está mal: seguramente copias todo antes de instalar dependencias. Invertir esas dos líneas suele bajar la reconstrucción de minutos a segundos.',
        completed: false,
      },
      {
        id: 'b3-l3',
        title: 'Docker Compose: varios servicios a la vez',
        type: 'reading',
        difficulty: 'profesional',
        content: `## El problema que resuelve

Tu proyecto no es una sola cosa: es una API, una base de datos y quizá una cache. Levantarlos a mano con \`docker run\` y sus puertos, volúmenes y variables es tedioso y no se puede versionar.

**Compose** describe todo el conjunto en un archivo.

\`\`\`yaml
# compose.yaml
services:
  api:
    build: .
    ports:
      - "8000:8000"
    environment:
      DATABASE_URL: postgresql://postgres:clave@db:5432/inventario
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: clave
      POSTGRES_DB: inventario
    volumes:
      - datos_pg:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      retries: 5

volumes:
  datos_pg:
\`\`\`

\`\`\`bash
docker compose up -d       # levantar todo
docker compose logs -f api # ver la salida de un servicio
docker compose down        # parar y borrar los contenedores
docker compose down -v     # ...y también los volúmenes (borra los datos)
\`\`\`

### El detalle que confunde a todos

Fíjate en la cadena de conexión: el host es **\`db\`**, no \`localhost\`.

Compose crea una red donde cada servicio es alcanzable por su nombre. Desde dentro de \`api\`, la base está en \`db:5432\`. Desde tu máquina, en \`localhost:5432\` solo si publicaste el puerto.

Usar \`localhost\` dentro de un contenedor apunta al propio contenedor, no al anfitrión. Es la causa número uno de "no se conecta a la base".

### depends_on no es suficiente

\`depends_on\` controla el **orden de arranque**, no que el servicio esté listo. Postgres tarda unos segundos en aceptar conexiones, y tu API arrancaría antes y fallaría.

Por eso se combina con \`healthcheck\` y \`condition: service_healthy\`: así la API espera a que la base responda de verdad.

### Desarrollo con recarga automática

\`\`\`yaml
  api:
    build: .
    volumes:
      - .:/app          # tu código entra en vivo
    command: fastapi dev main.py --host 0.0.0.0
\`\`\`

Montar el directorio permite editar en tu editor y ver el cambio sin reconstruir. Este bloque es solo para desarrollo: en producción el código va dentro de la imagen.

Y ojo con \`--host 0.0.0.0\`: sin eso el servidor solo escucha dentro del contenedor y no responde desde fuera.

### Un archivo por entorno

\`\`\`bash
docker compose -f compose.yaml -f compose.dev.yaml up
\`\`\`

Un archivo base con lo común y otro que añade lo específico de desarrollo evita tener dos definiciones que se desincronizan.`,
        tasks: [
          'Escribe un compose.yaml con tu API y una base Postgres con volumen',
          'Conecta la API a la base usando el nombre del servicio como host',
          'Agrega un healthcheck y comprueba que la API espera a que la base esté lista',
          'Monta el código como volumen y verifica que un cambio se refleja sin reconstruir',
        ],
        tip: 'Cuando un servicio no alcanza a otro, entra al contenedor con docker compose exec api bash y prueba la conexión desde dentro. Casi siempre el problema es haber usado localhost donde debía ir el nombre del servicio.',
        completed: false,
      },
      {
        id: 'b3-l4',
        title: 'Práctica: contenerizar el proyecto completo',
        type: 'practice',
        difficulty: 'profesional',
        content: `## El ejercicio

Toma la API de inventario con su base de datos y déjala funcionando con un solo comando en cualquier máquina.

La prueba de que está bien hecho: alguien clona el repositorio, ejecuta \`docker compose up\` y tiene el sistema entero corriendo, sin instalar Python ni Postgres.

### Lo que hay que montar

1. **Dockerfile de la API**, con las capas en el orden correcto, usuario sin privilegios y sin secretos dentro.
2. **\`.dockerignore\`** que excluya \`.venv\`, \`.git\`, \`__pycache__\` y \`.env\`.
3. **\`compose.yaml\`** con la API y Postgres, volumen para los datos y healthcheck.
4. **Migraciones aplicadas al arrancar**, para que la base quede lista sola.
5. **\`.env.example\`** en el repositorio con los nombres de las variables y sin sus valores.

### Aplicar migraciones al arrancar

\`\`\`yaml
  api:
    build: .
    command: sh -c "alembic upgrade head && fastapi run main.py --host 0.0.0.0"
\`\`\`

### La comprobación final

Bórralo todo y levántalo desde cero:

\`\`\`bash
docker compose down -v
docker compose up --build
\`\`\`

Si el sistema queda funcionando con la base migrada y sin ningún paso manual, está terminado. Si tuviste que ejecutar algo a mano, ese algo tiene que estar en el compose.`,
        tasks: [
          'Escribe el Dockerfile, el .dockerignore y el compose.yaml del proyecto',
          'Haz que las migraciones se apliquen solas al arrancar el servicio',
          'Ejecuta docker compose down -v y luego up --build para probarlo desde cero',
          'Documenta en el README el único comando que hace falta para levantarlo',
        ],
        tip: 'La prueba real es pedirle a alguien que no conoce el proyecto que lo levante siguiendo solo el README. Cada paso que tenga que preguntarte es un paso que falta automatizar o documentar.',
        completed: false,
      },
      {
        id: 'b3-l5',
        title: 'Examen: contenedores',
        type: 'exam',
        difficulty: 'profesional',
        questions: [
          {
            q: '¿Cuál es la diferencia entre una imagen y un contenedor?',
            options: [
              'La imagen corre en producción y el contenedor en desarrollo',
              'La imagen es la plantilla de solo lectura; el contenedor es una instancia suya en ejecución, y de una imagen se pueden levantar muchos',
              'Son lo mismo con nombres distintos según el sistema operativo',
              'El contenedor incluye el sistema operativo completo y la imagen no',
            ],
            correct: 1,
            explanation: 'La analogía útil es la de clase e instancia. build y pull actúan sobre imágenes; run, stop, logs y exec actúan sobre contenedores. Entender esa separación resuelve la mayoría de las confusiones al empezar.',
          },
          {
            q: 'En un Dockerfile, ¿por qué se copia requirements.txt e se instalan las dependencias ANTES de copiar el resto del código?',
            options: [
              'Porque Docker exige ese orden para encontrar el archivo',
              'Por la caché de capas: si el código cambia pero las dependencias no, Docker reutiliza la capa de instalación y la reconstrucción tarda segundos en vez de minutos',
              'Porque las dependencias deben instalarse como root y el código no',
              'Para reducir el tamaño final de la imagen',
            ],
            correct: 1,
            explanation: 'Cada instrucción genera una capa cacheada. Docker invalida una capa y todas las siguientes cuando su entrada cambia. Copiando primero solo el archivo de dependencias, un cambio en el código no invalida la instalación, que es la parte lenta.',
          },
          {
            q: 'Tu API dentro de un contenedor no logra conectarse a la base de datos declarada en el mismo compose. La cadena usa localhost. ¿Qué pasa?',
            options: [
              'Falta abrir el puerto 5432 en el firewall del sistema',
              'Dentro de un contenedor, localhost apunta al propio contenedor: hay que usar el nombre del servicio, por ejemplo db, que Compose resuelve en su red interna',
              'Postgres no acepta conexiones desde contenedores',
              'Falta declarar el volumen de datos',
            ],
            correct: 1,
            explanation: 'Compose crea una red donde cada servicio es alcanzable por su nombre. localhost dentro del contenedor de la API se refiere a esa misma API. La cadena debe apuntar a db:5432, que es el nombre del servicio en el compose.',
          },
          {
            q: '¿Por qué no se deben poner claves con ENV en el Dockerfile?',
            options: [
              'Porque ENV solo admite valores numéricos',
              'Porque quedan grabadas en la imagen y en su historial de capas: al publicarla, el secreto queda expuesto y borrarlo después no lo elimina',
              'Porque las variables definidas con ENV no están disponibles en tiempo de ejecución',
              'Porque hacen la imagen considerablemente más grande',
            ],
            correct: 1,
            explanation: 'Una imagen conserva el historial de todas sus capas. Un secreto escrito con ENV es recuperable por cualquiera que tenga la imagen, incluso si una capa posterior lo sobrescribe. La configuración sensible se pasa al ejecutar, con --env-file o variables del entorno de despliegue.',
          },
          {
            q: 'Paras un contenedor de Postgres y al volver a levantarlo los datos desaparecieron. ¿Por qué?',
            options: [
              'Porque Postgres borra su base al detenerse de forma limpia',
              'Porque el sistema de archivos de un contenedor es efímero: sin un volumen montado, todo lo escrito dentro se pierde al eliminarlo',
              'Porque faltaba ejecutar las migraciones al arrancar',
              'Porque la imagen de Postgres solo guarda datos en memoria',
            ],
            correct: 1,
            explanation: 'Los contenedores son desechables por diseño: su capa de escritura desaparece con ellos. Cualquier dato que deba sobrevivir necesita un volumen, que es almacenamiento gestionado por Docker con vida independiente del contenedor.',
          },
        ],
        completed: false,
      },
    ],
    resources: [
      {
        title: 'Docker — documentación oficial',
        url: 'https://docs.docker.com/',
        type: 'documentation',
      },
      {
        title: 'Docker Compose — referencia del archivo',
        url: 'https://docs.docker.com/compose/compose-file/',
        type: 'documentation',
      },
      {
        title: 'Buenas prácticas para escribir Dockerfiles',
        url: 'https://docs.docker.com/build/building/best-practices/',
        type: 'documentation',
      },
      {
        title: 'Play with Docker — practicar sin instalar nada',
        url: 'https://labs.play-with-docker.com/',
        type: 'tool',
      },
    ],
  },
  {
    id: 'web-ts',
    number: 14,
    title: 'TypeScript: JavaScript con red de seguridad',
    description: 'Tipos que atrapan los errores antes de que lleguen al navegador, y que convierten tu editor en documentación viva.',
    duration: '3 semanas',
    status: 'available',
    track: 'web',
    audience: 'aprendizaje',
    lessons: [
      {
        id: 'wts-l1',
        title: 'Por qué TypeScript, en concreto',
        type: 'reading',
        difficulty: 'intermedio',
        content: `## El error que TypeScript elimina

En JavaScript esto se ejecuta sin quejarse y falla en producción:

\`\`\`js
function calcularTotal(precio, cantidad) {
  return precio * cantidad
}

calcularTotal('100', 2)      // '100' * 2 = 200 ... por casualidad
calcularTotal(100)           // 100 * undefined = NaN
calcularTotal({ precio: 100 }, 2)  // NaN
\`\`\`

Ninguna de las tres llamadas produce un error visible. La primera funciona de casualidad, las otras dos devuelven \`NaN\` y ese \`NaN\` viaja por el sistema hasta aparecer como "Total: NaN" en la pantalla de un cliente.

Con tipos, las tres se detienen antes de correr:

\`\`\`ts
function calcularTotal(precio: number, cantidad: number): number {
  return precio * cantidad
}

calcularTotal('100', 2)   // Error: string no es asignable a number
calcularTotal(100)        // Error: se esperaban 2 argumentos, llegó 1
\`\`\`

### Qué es TypeScript exactamente

Es JavaScript más un sistema de tipos. Se **compila** a JavaScript normal: el navegador nunca ve TypeScript. Los tipos existen solo mientras escribes y compilas; en tiempo de ejecución desaparecen por completo.

Esa última frase tiene una consecuencia que hay que entender desde el primer día: **TypeScript no valida los datos que llegan de afuera.** Si una API te devuelve algo distinto de lo que declaraste, TypeScript no se entera. Para eso está Zod, que valida en tiempo de ejecución. Los dos se complementan.

### Los tres beneficios reales

**Errores antes de ejecutar.** El editor los subraya mientras escribes, no cuando un usuario los encuentra.

**Autocompletado que sabe.** Si una función devuelve un \`Usuario\`, tu editor te ofrece sus campos exactos. Dejas de ir a mirar cómo se llamaba la propiedad.

**Refactorizar sin miedo.** Renombra un campo y el editor te muestra los 14 lugares que hay que actualizar. En JavaScript, buscarías por texto y rezarías.

### El coste

Escribes más. Al principio peleas con el compilador. Cuanto más grande el proyecto, más rentable es: en un archivo de 50 líneas apenas se nota, en un proyecto de 200 archivos es lo que lo hace mantenible.

### Ponerlo a andar

En un proyecto Next.js ya viene configurado: basta con nombrar los archivos \`.ts\` y \`.tsx\`. Para un proyecto desde cero:

\`\`\`bash
npm install -D typescript
npx tsc --init
\`\`\`

Y la opción que de verdad importa en \`tsconfig.json\`:

\`\`\`json
{
  "compilerOptions": {
    "strict": true
  }
}
\`\`\`

Sin \`strict\`, TypeScript deja pasar \`null\` y \`undefined\` en todas partes y pierdes la mitad del valor. Enciéndelo desde el primer día: activarlo después, con el proyecto crecido, es mucho más doloroso.`,
        tasks: [
          'Crea un proyecto con npx tsc --init y activa strict en el tsconfig.json',
          'Escribe una función sin tipos, comprueba que compila, y luego agrégalos para ver el error aparecer',
          'Explica en una frase por qué TypeScript no puede validar la respuesta de una API en tiempo de ejecución',
          'Renombra un campo de un objeto usado en tres archivos y observa cómo el editor te señala los tres',
        ],
        tip: 'La confusión más común al empezar: creer que TypeScript protege en tiempo de ejecución. No lo hace. Los tipos se borran al compilar. Todo lo que entra de afuera —formularios, APIs, localStorage— sigue necesitando validación real con Zod.',
        completed: false,
      },
      {
        id: 'wts-l2',
        title: 'Tipos básicos, inferencia y el pecado del any',
        type: 'reading',
        difficulty: 'intermedio',
        content: `## Los tipos que vas a usar

\`\`\`ts
const nombre: string = 'Gabriel'
const edad: number = 32
const activo: boolean = true
const etiquetas: string[] = ['web', 'diseño']
const par: [string, number] = ['total', 100]   // tupla: orden y longitud fijos
\`\`\`

### Deja que infiera

TypeScript deduce el tipo solo. Anotar lo obvio es ruido:

\`\`\`ts
const nombre: string = 'Gabriel'   // redundante
const nombre = 'Gabriel'           // ya es string
\`\`\`

**Anota siempre** los parámetros de función y el valor de retorno de las funciones públicas. **Deja inferir** las variables locales. Esa es la regla práctica.

### null y undefined con strict

Con \`strict\` activado, un \`string\` no puede ser \`null\`. Si algo puede faltar, hay que decirlo:

\`\`\`ts
let apodo: string | null = null
function buscar(id: string): Usuario | undefined { ... }
\`\`\`

Y entonces TypeScript te obliga a comprobarlo antes de usarlo, que es exactamente el error que quieres evitar:

\`\`\`ts
const usuario = buscar('123')
console.log(usuario.nombre)        // Error: puede ser undefined

if (usuario) {
  console.log(usuario.nombre)      // aquí sí: dentro del if ya no puede serlo
}
\`\`\`

### any: la puerta de atrás

\`any\` desactiva todas las comprobaciones para ese valor. Es contagioso: lo que toca un \`any\` deja de estar protegido.

\`\`\`ts
const datos: any = await respuesta.json()
datos.usuario.nombre.toUpperCase()   // compila, y puede reventar en ejecución
\`\`\`

Cuando de verdad no sabes el tipo, usa \`unknown\`. Es como \`any\` pero honesto: te obliga a comprobar antes de usar.

\`\`\`ts
const datos: unknown = await respuesta.json()

datos.usuario                        // Error: no se puede acceder a unknown
if (typeof datos === 'object' && datos !== null && 'usuario' in datos) {
  // aquí TypeScript ya sabe algo del valor
}
\`\`\`

En la práctica, para respuestas de API lo que haces es validar con Zod y obtener un tipo seguro de regalo:

\`\`\`ts
const Usuario = z.object({ nombre: z.string(), edad: z.number() })
const usuario = Usuario.parse(await respuesta.json())   // tipado y validado
\`\`\`

### Funciones

\`\`\`ts
function saludar(nombre: string): string {
  return \`Hola, \${nombre}\`
}

// parámetro opcional: va al final y su tipo incluye undefined
function crear(nombre: string, apodo?: string) { ... }

// valor por defecto: el tipo se infiere del defecto
function conectar(puerto = 3000) { ... }

// función que no devuelve nada
function registrar(mensaje: string): void {
  console.log(mensaje)
}
\`\`\``,
        tasks: [
          'Escribe cinco funciones tipadas: una con parámetro opcional, una con valor por defecto y una que devuelva void',
          'Busca en un proyecto tuyo todos los any y sustituye al menos uno por unknown con su comprobación',
          'Provoca a propósito el error de "puede ser undefined" y resuélvelo con una comprobación previa',
          'Valida la respuesta de una API con Zod y comprueba que el tipo resultante es correcto en el editor',
        ],
        tip: 'Si te ves poniendo any para que el compilador se calle, ese es justo el punto donde había un error real esperándote. Casi siempre lo que necesitas es unknown más una comprobación, o un esquema de Zod.',
        completed: false,
      },
      {
        id: 'wts-l3',
        title: 'Interfaces, uniones y narrowing',
        type: 'reading',
        difficulty: 'intermedio',
        content: `## Describir la forma de los objetos

\`\`\`ts
interface Usuario {
  id: string
  nombre: string
  email: string
  apodo?: string          // opcional
  readonly creadoEn: Date // no se puede reasignar
}

function saludar(usuario: Usuario): string {
  return \`Hola, \${usuario.nombre}\`
}
\`\`\`

### interface o type

Hacen casi lo mismo. La diferencia práctica: \`interface\` se puede extender y reabrir; \`type\` sirve además para uniones y alias de cualquier tipo.

\`\`\`ts
interface Admin extends Usuario {
  permisos: string[]
}

type Estado = 'borrador' | 'publicado' | 'archivado'
type Id = string | number
\`\`\`

Convención razonable: \`interface\` para la forma de objetos, \`type\` para todo lo demás.

### Uniones literales: el tipo que más rendimiento da

\`\`\`ts
type Estado = 'borrador' | 'publicado' | 'archivado'

function publicar(estado: Estado) { ... }

publicar('publicado')   // bien
publicar('publicadp')   // Error, y el editor sugiere las tres opciones válidas
\`\`\`

Esto sustituye a las constantes de texto sueltas y elimina de raíz una familia entera de errores de tipeo. En el sistema de la Academia, \`Track\` y \`Rama\` son exactamente esto.

### Narrowing: TypeScript te sigue el razonamiento

Cuando compruebas algo, TypeScript acota el tipo dentro de esa rama:

\`\`\`ts
function formatear(valor: string | number): string {
  if (typeof valor === 'string') {
    return valor.toUpperCase()    // aquí es string
  }
  return valor.toFixed(2)         // aquí solo puede ser number
}
\`\`\`

Las herramientas de narrowing: \`typeof\`, \`instanceof\`, \`in\`, \`Array.isArray\` y comparar contra literales.

### Uniones discriminadas

El patrón más útil de todos. Un campo común distingue las variantes:

\`\`\`ts
type Resultado =
  | { estado: 'ok'; datos: Usuario[] }
  | { estado: 'error'; mensaje: string }

function mostrar(r: Resultado) {
  if (r.estado === 'ok') {
    console.log(r.datos.length)    // datos existe aquí
  } else {
    console.log(r.mensaje)         // mensaje existe aquí
  }
}
\`\`\`

Intentar leer \`r.datos\` en la rama de error es un error de compilación. El sistema de tipos te impide olvidar el caso de fallo, que es justo el que todo el mundo olvida.

### Índices y registros

\`\`\`ts
// un objeto cuyas claves son de un conjunto conocido
const etiquetas: Record<Estado, string> = {
  borrador: 'Borrador',
  publicado: 'Publicado',
  archivado: 'Archivado',
}
\`\`\`

Si mañana agregas un cuarto estado a \`Estado\`, este objeto deja de compilar hasta que lo completes. Un olvido menos.`,
        tasks: [
          'Define una interface para una entidad real de tu proyecto, con un campo opcional y uno readonly',
          'Sustituye tres constantes de texto sueltas por una unión literal y comprueba el autocompletado',
          'Escribe una unión discriminada para el resultado de una petición: éxito con datos, fallo con mensaje',
          'Usa Record para una tabla de etiquetas y agrega un valor nuevo a la unión para ver el error aparecer',
        ],
        tip: 'La unión discriminada es el patrón que más errores evita en aplicaciones reales, porque hace imposible leer los datos sin haber contemplado antes el caso de error. Úsala para toda respuesta que pueda fallar.',
        completed: false,
      },
      {
        id: 'wts-l4',
        title: 'Genéricos y tipos utilitarios',
        type: 'reading',
        difficulty: 'profesional',
        content: `## Genéricos: funciones que conservan el tipo

Sin genéricos hay que elegir entre repetir código o perder la información:

\`\`\`ts
function primero(lista: any[]): any { return lista[0] }

const u = primero(usuarios)   // any — perdimos que era Usuario
\`\`\`

Con un genérico, el tipo entra y sale intacto:

\`\`\`ts
function primero<T>(lista: T[]): T | undefined {
  return lista[0]
}

const u = primero(usuarios)   // Usuario | undefined
const n = primero([1, 2, 3])  // number | undefined
\`\`\`

\`T\` es un hueco que se rellena en cada llamada. No hace falta pasarlo: TypeScript lo deduce del argumento.

### Restringir el genérico

\`\`\`ts
// solo acepta cosas que tengan id
function porId<T extends { id: string }>(lista: T[], id: string): T | undefined {
  return lista.find((item) => item.id === id)
}
\`\`\`

### Los utilitarios que vas a usar de verdad

\`\`\`ts
interface Usuario {
  id: string
  nombre: string
  email: string
  password: string
}

Partial<Usuario>              // todos los campos opcionales — ideal para actualizaciones
Required<Usuario>             // todos obligatorios
Pick<Usuario, 'id' | 'nombre'>    // solo esos dos campos
Omit<Usuario, 'password'>         // todos menos password
Readonly<Usuario>             // ninguno se puede reasignar
Record<string, number>        // objeto de claves string y valores number
\`\`\`

Casos reales:

\`\`\`ts
// lo que sale hacia el cliente nunca lleva la contraseña
type UsuarioPublico = Omit<Usuario, 'password'>

// una actualización solo trae los campos que cambian
function actualizar(id: string, cambios: Partial<Usuario>) { ... }
\`\`\`

Lo valioso es que se derivan del tipo original: si mañana agregas un campo a \`Usuario\`, todos estos se actualizan solos.

### Derivar tipos en vez de escribirlos

\`\`\`ts
// el tipo de un valor existente
const config = { puerto: 3000, host: 'localhost' }
type Config = typeof config

// las claves de un tipo, como unión
type CampoUsuario = keyof Usuario    // 'id' | 'nombre' | 'email' | 'password'

// el tipo que devuelve una función
type Resultado = ReturnType<typeof calcularTotal>
\`\`\`

La regla general: **una sola fuente de verdad**. Si el tipo se puede derivar de algo que ya existe, derívalo en vez de escribirlo aparte. Dos definiciones separadas terminan siempre desincronizadas.`,
        tasks: [
          'Escribe una función genérica que devuelva el último elemento de cualquier lista conservando el tipo',
          'Restringe un genérico con extends para que solo acepte objetos con un campo concreto',
          'Crea un tipo UsuarioPublico con Omit y comprueba que la contraseña ya no aparece',
          'Deriva un tipo con typeof a partir de un objeto de configuración existente',
        ],
        tip: 'Si estás escribiendo un tipo que repite campos de otro que ya existe, casi siempre hay un utilitario que lo deriva. Derivar en vez de duplicar es lo que evita que los tipos se queden viejos cuando el modelo cambia.',
        completed: false,
      },
      {
        id: 'wts-l5',
        title: 'TypeScript en React y Next.js',
        type: 'reading',
        difficulty: 'profesional',
        content: `## Tipar las props

\`\`\`tsx
interface BotonProps {
  texto: string
  variante?: 'primario' | 'secundario'
  onClick: () => void
  disabled?: boolean
}

export default function Boton({ texto, variante = 'primario', onClick, disabled }: BotonProps) {
  return (
    <button onClick={onClick} disabled={disabled} className={variante}>
      {texto}
    </button>
  )
}
\`\`\`

Con esto, quien use el componente recibe autocompletado de sus props y un error si olvida \`onClick\` o escribe mal la variante.

### children y props del DOM

\`\`\`tsx
import type { ReactNode, ButtonHTMLAttributes } from 'react'

interface CardProps {
  titulo: string
  children: ReactNode        // cualquier cosa renderizable
}

// heredar todas las props nativas de un <button>
interface BotonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: 'primario' | 'secundario'
}
\`\`\`

### Hooks

\`\`\`tsx
const [nombre, setNombre] = useState('')              // infiere string
const [usuario, setUsuario] = useState<Usuario | null>(null)  // hay que decirlo
const [items, setItems] = useState<string[]>([])      // si arranca vacío, también
\`\`\`

La regla: si el valor inicial ya representa el tipo final, deja inferir. Si arranca en \`null\` o en lista vacía, anótalo.

\`\`\`tsx
const ref = useRef<HTMLInputElement>(null)
ref.current?.focus()     // el ? porque puede ser null antes del montaje
\`\`\`

### Eventos

\`\`\`tsx
function onChange(e: React.ChangeEvent<HTMLInputElement>) {
  setNombre(e.target.value)
}

function onSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault()
}
\`\`\`

Truco: si escribes el manejador en línea, TypeScript deduce el tipo del evento solo. Solo hace falta anotarlo cuando la función se declara aparte.

### Next.js App Router

Los \`params\` de una página son una promesa y hay que esperarlos:

\`\`\`tsx
interface Props {
  params: Promise<{ slug: string }>
}

export default async function Pagina({ params }: Props) {
  const { slug } = await params
  ...
}
\`\`\`

### El error de tipos más frecuente en React

\`\`\`tsx
// Mal: se ejecuta al renderizar, no al hacer clic
<button onClick={borrar(id)}>Borrar</button>

// Bien
<button onClick={() => borrar(id)}>Borrar</button>
\`\`\`

TypeScript lo atrapa: \`onClick\` espera una función, y \`borrar(id)\` es el *resultado* de llamarla. En JavaScript puro este error borra el elemento nada más cargar la página.`,
        tasks: [
          'Tipa las props de tres componentes tuyos, con una unión literal para una variante',
          'Crea un componente que herede las props nativas de un elemento del DOM con ButtonHTMLAttributes',
          'Tipa un useState que arranque en null y resuelve los errores de acceso que aparezcan',
          'Escribe un manejador de formulario declarado aparte, con su tipo de evento correcto',
        ],
        tip: 'Cuando no sepas qué tipo lleva un evento o una prop, pásale el cursor por encima en el editor: te muestra el tipo exacto que espera. Es más rápido y más fiable que buscarlo en la documentación.',
        completed: false,
      },
      {
        id: 'wts-l6',
        title: 'Práctica: migrar un archivo real a TypeScript',
        type: 'practice',
        difficulty: 'profesional',
        content: `## El ejercicio

Migrar de golpe un proyecto entero es la forma segura de abandonarlo. Se hace archivo por archivo, y este ejercicio te enseña el procedimiento con uno real.

### El procedimiento

1. **Elige el archivo correcto.** No el más grande: uno con lógica y pocas dependencias. Un módulo de utilidades o de cálculo es ideal.
2. **Renómbralo** de \`.js\` a \`.ts\` (o \`.jsx\` a \`.tsx\`).
3. **Mira los errores que aparecen.** Van a ser muchos. No es que hayas roto nada: son errores que ya existían y estaban invisibles.
4. **Arréglalos de arriba abajo.** Muchos se resuelven solos al tipar los parámetros de una función.
5. **Prohibido usar \`any\` para callar el compilador.** Si no sabes el tipo, usa \`unknown\` y comprueba.
6. **Comprueba que sigue funcionando** antes de pasar al siguiente archivo.

### Los errores que vas a encontrar y qué significan

\`Parameter 'x' implicitly has an 'any' type\`
Falta anotar el parámetro. Es el más común y el más fácil.

\`Object is possibly 'undefined'\`
Un valor puede faltar y no lo estabas comprobando. **Este es un error real que ya tenías**, no una molestia del compilador.

\`Property 'nombre' does not exist on type '{}'\`
Un objeto sin forma declarada. Define su interface.

\`Type 'string | undefined' is not assignable to type 'string'\`
Estás pasando algo que puede faltar donde se exige un valor. Comprueba antes, o marca el destino como opcional.

### Lo que hay que documentar

Anota cada error que resultó ser un fallo real y no solo una anotación faltante. Esa lista es la respuesta concreta a "¿para qué sirve TypeScript?", con evidencia de tu propio código.`,
        tasks: [
          'Elige un archivo con lógica de un proyecto tuyo y renómbralo a .ts',
          'Resuelve todos los errores sin usar any ni una sola vez',
          'Anota cuáles de esos errores eran fallos reales que ya existían en el código',
          'Comprueba que el proyecto sigue funcionando y repite con un segundo archivo',
        ],
        tip: 'Los errores de "posiblemente undefined" son los valiosos: cada uno es un lugar donde tu aplicación podía romperse con datos incompletos. Cuéntalos al terminar, porque son la medida real de lo que ganaste.',
        completed: false,
      },
      {
        id: 'wts-l7',
        title: 'Examen: TypeScript',
        type: 'exam',
        difficulty: 'profesional',
        questions: [
          {
            q: 'Declaras que una función recibe un Usuario, pero la API devuelve un objeto sin el campo email. ¿Qué pasa en tiempo de ejecución?',
            options: [
              'TypeScript lanza un error porque el objeto no cumple el tipo',
              'Nada: los tipos se borran al compilar, así que el objeto entra igual y falla más adelante',
              'El campo email se rellena automáticamente con una cadena vacía',
              'La función no se ejecuta y devuelve undefined',
            ],
            correct: 1,
            explanation: 'TypeScript solo existe en tiempo de compilación: el JavaScript resultante no contiene ninguna comprobación de tipos. Los datos que vienen de fuera —APIs, formularios, localStorage— necesitan validación real en ejecución, para lo que se usa Zod.',
          },
          {
            q: '¿Cuál es la diferencia práctica entre any y unknown?',
            options: [
              'Son sinónimos, unknown es el nombre moderno de any',
              'any desactiva las comprobaciones y se propaga; unknown también es un valor sin tipo, pero obliga a comprobarlo antes de usarlo',
              'unknown solo se puede usar en parámetros de función',
              'any es para objetos y unknown para valores primitivos',
            ],
            correct: 1,
            explanation: 'Los dos representan "no sé qué tipo es", pero any te deja hacer cualquier cosa sin avisar y contagia esa falta de protección a todo lo que toca. unknown no permite acceder a nada hasta que hayas comprobado de qué se trata, que es el comportamiento honesto.',
          },
          {
            q: '¿Qué ventaja tiene una unión discriminada sobre un objeto con campos opcionales?',
            options: [
              'Ocupa menos memoria en tiempo de ejecución',
              'Impide leer los datos sin haber comprobado antes el caso de error, porque cada variante solo expone sus propios campos',
              'Permite usar any de forma segura',
              'Hace que el código compile más rápido',
            ],
            correct: 1,
            explanation: 'Con campos opcionales podrías leer datos en el caso de error y TypeScript no diría nada. Con una unión discriminada, cada variante declara exactamente qué campos tiene, así que acceder a los datos sin comprobar primero el discriminante es un error de compilación.',
          },
          {
            q: 'Necesitas un tipo igual a Usuario pero sin el campo password, para lo que se envía al cliente. ¿Cuál usas?',
            options: [
              'Partial<Usuario>',
              'Omit<Usuario, "password">',
              'Readonly<Usuario>',
              'Escribir una interface nueva con los campos restantes',
            ],
            correct: 1,
            explanation: 'Omit deriva el tipo del original quitando las claves indicadas. Escribir una interface nueva a mano funciona hoy pero se desincroniza en cuanto alguien agregue un campo a Usuario: derivar mantiene una sola fuente de verdad.',
          },
          {
            q: '¿Por qué conviene activar "strict": true desde el primer día?',
            options: [
              'Porque hace que el código compilado sea más rápido',
              'Porque sin strict, null y undefined se aceptan en todas partes y se pierde gran parte de la protección; activarlo con el proyecto ya crecido es mucho más costoso',
              'Porque es obligatorio en Next.js',
              'Porque permite usar genéricos, que de otro modo no están disponibles',
            ],
            correct: 1,
            explanation: 'Sin strict —en particular sin strictNullChecks— cualquier valor puede ser null o undefined sin que TypeScript avise, que es justo la familia de errores más común en JavaScript. Encenderlo después obliga a resolver cientos de errores acumulados de golpe.',
          },
          {
            q: 'En React, ¿qué error de tipos atrapa TypeScript en <button onClick={borrar(id)}>?',
            options: [
              'Ninguno: es la forma correcta de pasar argumentos a un manejador',
              'Que onClick espera una función, pero borrar(id) es el resultado de llamarla — se ejecutaría al renderizar',
              'Que falta declarar el tipo del evento de clic',
              'Que id debería ser string y no number',
            ],
            correct: 1,
            explanation: 'onClick espera una referencia a una función. Al escribir borrar(id) la estás llamando durante el render y pasando su valor de retorno. En JavaScript puro esto borra el elemento nada más cargar la página; TypeScript lo detiene en el editor. La forma correcta es onClick={() => borrar(id)}.',
          },
        ],
        completed: false,
      },
    ],
    resources: [
      {
        title: 'TypeScript Handbook — documentación oficial',
        url: 'https://www.typescriptlang.org/docs/handbook/intro.html',
        type: 'documentation',
      },
      {
        title: 'Type Challenges — ejercicios de tipos por dificultad',
        url: 'https://github.com/type-challenges/type-challenges',
        type: 'tool',
      },
      {
        title: 'React TypeScript Cheatsheet',
        url: 'https://react-typescript-cheatsheet.netlify.app/',
        type: 'documentation',
      },
      {
        title: 'Zod — validar en ejecución lo que TypeScript no puede',
        url: 'https://zod.dev/',
        type: 'documentation',
      },
    ],
  },
  {
    id: 'fund-3',
    number: 3,
    title: 'Python: el segundo lenguaje',
    description: 'El lenguaje que abre el backend, los datos y la IA. De la sintaxis a un script que resuelve un problema real de tu trabajo.',
    duration: '3 semanas',
    status: 'available',
    track: 'fundamentos',
    audience: 'aprendizaje',
    lessons: [
      {
        id: 'f3-l1',
        title: 'Por qué Python, y cómo montarlo sin ensuciar tu máquina',
        type: 'reading',
        difficulty: 'básico',
        content: `## Dos lenguajes, dos territorios

JavaScript domina el navegador. Python domina casi todo lo demás: automatización, análisis de datos, aprendizaje automático y la mayor parte de las bibliotecas de IA. Si quieres entrenar un modelo, procesar un archivo de un millón de filas o construir una API que hable con modelos de lenguaje, el ecosistema está en Python.

No compiten. Un perfil que maneja los dos cubre el producto entero: la interfaz en TypeScript, el procesamiento y la IA en Python.

### Instalar

Python 3.11 o superior. En macOS y Linux ya viene una versión, pero conviene no tocar la del sistema.

\`\`\`bash
python3 --version      # comprobar qué hay
\`\`\`

En Windows, descárgalo de python.org y **marca la casilla "Add Python to PATH"** durante la instalación. Saltarse esa casilla es el motivo número uno de que \`python\` no funcione en la terminal después.

### El entorno virtual: la parte que no se puede saltar

Python instala paquetes de forma global por defecto. Dos proyectos que necesiten versiones distintas de la misma biblioteca se pisan y rompen. Un **entorno virtual** es una carpeta con su propia copia de Python y sus propios paquetes, aislada del resto.

\`\`\`bash
python3 -m venv .venv           # crear el entorno, una vez por proyecto

source .venv/bin/activate       # activarlo — macOS y Linux
.venv\\Scripts\\activate           # activarlo — Windows

deactivate                      # salir
\`\`\`

Cuando está activo, el nombre aparece al principio de la línea de la terminal:

\`\`\`
(.venv) usuario@equipo proyecto %
\`\`\`

Si no ves ese prefijo, **no está activo** y todo lo que instales va a parar al sistema. Es el error más común al empezar.

### Instalar paquetes y dejar constancia

\`\`\`bash
pip install requests
pip freeze > requirements.txt   # anotar las versiones exactas
pip install -r requirements.txt # reproducir el entorno en otra máquina
\`\`\`

\`requirements.txt\` sí se sube al repositorio. \`.venv/\` no: es el equivalente a \`node_modules\`, se reconstruye. Agrégalo al \`.gitignore\`.

### Correr código

\`\`\`bash
python archivo.py       # ejecutar un script
python                  # abrir el intérprete interactivo para probar cosas
\`\`\`

El intérprete interactivo es una herramienta de trabajo real, no un juguete: pruebas una línea, ves el resultado y sigues.`,
        tasks: [
          'Instala Python 3.11 o superior y comprueba la versión desde la terminal',
          'Crea un proyecto con su entorno virtual y confirma que ves el prefijo (.venv) al activarlo',
          'Instala requests dentro del entorno y genera el requirements.txt',
          'Agrega .venv/ al .gitignore y explica por qué requirements.txt sí se versiona',
        ],
        tip: 'Antes de ejecutar cualquier pip install, mira si tu línea de terminal empieza con (.venv). Si no está, estás instalando en el Python del sistema, y ese es el origen de la mayoría de los conflictos de versiones que verás en foros.',
        completed: false,
      },
      {
        id: 'f3-l2',
        title: 'Sintaxis: lo que cambia respecto a JavaScript',
        type: 'reading',
        difficulty: 'básico',
        content: `## La indentación es sintaxis

En JavaScript los bloques van entre llaves y la indentación es estética. En Python **la indentación define el bloque**. Si la sangría está mal, el programa hace otra cosa o no corre.

\`\`\`python
if edad >= 18:
    print("Mayor de edad")
    print("Puede votar")      # dentro del if
print("Fin")                  # fuera del if
\`\`\`

Cuatro espacios por nivel. Nunca mezcles tabuladores y espacios en el mismo archivo.

### Variables y tipos

\`\`\`python
nombre = "Gabriel"        # str
edad = 32                 # int
altura = 1.78             # float
activo = True             # bool — con mayúscula
nada = None               # el equivalente de null
\`\`\`

Sin \`const\` ni \`let\`. Para indicar que algo es constante, la convención es escribirlo en mayúsculas: \`API_URL = "..."\`.

### Cadenas

\`\`\`python
nombre = "Gabriel"
print(f"Hola, {nombre}")             # f-string: como los template literals
print(f"El total es {precio * 1.16:.2f}")   # con formato: dos decimales
\`\`\`

### Condicionales y bucles

\`\`\`python
if estado == "activo":
    ...
elif estado == "pausado":
    ...
else:
    ...

for producto in productos:           # como el for...of de JavaScript
    print(producto)

for i in range(5):                   # 0, 1, 2, 3, 4
    print(i)

while intentos < 3:
    intentos += 1                    # no existe ++
\`\`\`

### Comparaciones y verdad

\`\`\`python
and   or   not          # en vez de &&  ||  !
==    !=                # no existe ===, == ya compara por valor
is                      # compara identidad, se usa sobre todo con None
\`\`\`

\`\`\`python
if usuario is None:      # así se comprueba None, no con ==
    ...
\`\`\`

Se consideran falsos: \`False\`, \`None\`, \`0\`, \`""\`, \`[]\`, \`{}\`. Igual que en JavaScript, una lista vacía es falsa, lo que permite escribir \`if productos:\`.

### Funciones

\`\`\`python
def calcular_total(precio, cantidad, iva=0.16):
    subtotal = precio * cantidad
    return round(subtotal * (1 + iva), 2)

total = calcular_total(100, 2)
total = calcular_total(100, 2, iva=0.21)     # argumento por nombre
\`\`\`

Los argumentos por nombre son habituales en Python y hacen el código mucho más legible que una fila de valores sueltos.

### Nombres

La convención es \`snake_case\` para variables y funciones, \`PascalCase\` para clases. Es distinta de JavaScript y conviene respetarla: el código Python que no la sigue se lee como escrito por alguien de paso.`,
        tasks: [
          'Traduce a Python tres funciones que ya tengas escritas en JavaScript',
          'Escribe una función con un argumento por defecto y llámala usando argumento por nombre',
          'Provoca a propósito un error de indentación y lee el mensaje que da Python',
          'Escribe una comprobación de None usando is y explica por qué no se usa ==',
        ],
        tip: 'El error más frecuente viniendo de JavaScript es olvidar los dos puntos al final de un if, un for o un def. El mensaje de Python es claro y señala la línea exacta: acostúmbrate a leerlo en vez de revisar el código a ojo.',
        completed: false,
      },
      {
        id: 'f3-l3',
        title: 'Listas, diccionarios y comprensiones',
        type: 'reading',
        difficulty: 'intermedio',
        content: `## Las cuatro estructuras

\`\`\`python
lista = [1, 2, 3]                        # ordenada, modificable
tupla = (1, 2, 3)                        # ordenada, inmutable
conjunto = {1, 2, 3}                     # sin orden, sin repetidos
diccionario = {"nombre": "Gabriel"}      # pares clave-valor, como un objeto de JS
\`\`\`

### Listas

\`\`\`python
productos = ["laptop", "mouse", "teclado"]

productos[0]          # 'laptop'
productos[-1]         # 'teclado' — índices negativos desde el final
productos[0:2]        # ['laptop', 'mouse'] — rebanada
len(productos)

productos.append("monitor")
productos.remove("mouse")
"laptop" in productos     # True — comprobar pertenencia es directo
\`\`\`

Los índices negativos y las rebanadas son de lo más cómodo del lenguaje: \`texto[-4:]\` te da los últimos cuatro caracteres sin calcular longitudes.

### Diccionarios

\`\`\`python
usuario = {"nombre": "Gabriel", "edad": 32}

usuario["nombre"]                 # 'Gabriel' — falla si no existe
usuario.get("apodo")              # None si no existe — más seguro
usuario.get("apodo", "sin apodo") # con valor por defecto

usuario["email"] = "g@mail.com"   # agregar o actualizar

for clave, valor in usuario.items():
    print(f"{clave}: {valor}")
\`\`\`

Usa \`.get()\` siempre que la clave pueda faltar. El acceso con corchetes sobre una clave inexistente lanza \`KeyError\` y detiene el programa.

### Comprensiones: el idioma de Python

Es la forma idiomática de transformar y filtrar. Sustituye a \`map\` y \`filter\`:

\`\`\`python
precios = [100, 250, 80, 500]

# map
con_iva = [p * 1.16 for p in precios]

# filter
caros = [p for p in precios if p > 100]

# los dos a la vez
caros_con_iva = [p * 1.16 for p in precios if p > 100]

# sobre diccionarios
nombres = {u["id"]: u["nombre"] for u in usuarios}
\`\`\`

Se lee de izquierda a derecha: qué produzco, de dónde lo saco, con qué condición. Si una comprensión no cabe cómodamente en una línea, escribe un bucle normal: la legibilidad vale más que la brevedad.

### Desempaquetar

\`\`\`python
nombre, edad = ("Gabriel", 32)

for indice, producto in enumerate(productos):    # con el índice
    print(indice, producto)

for nombre, precio in zip(nombres, precios):     # dos listas a la vez
    print(nombre, precio)
\`\`\`

### Ordenar y agregar

\`\`\`python
sorted(productos)                                   # copia ordenada
sorted(usuarios, key=lambda u: u["edad"])           # por un campo
sorted(usuarios, key=lambda u: u["edad"], reverse=True)

sum(precios)
max(precios)
min(precios)
\`\`\``,
        tasks: [
          'Carga una lista de diccionarios con datos reales de un proyecto tuyo',
          'Escribe tres comprensiones: una que transforme, una que filtre y una que haga las dos cosas',
          'Ordena la lista por dos campos distintos usando key con una lambda',
          'Sustituye un acceso con corchetes por .get() con valor por defecto y provoca el KeyError para ver la diferencia',
        ],
        tip: 'Las comprensiones son la marca de que alguien escribe Python y no JavaScript con otra sintaxis. Pero tienen un límite: en cuanto necesitas dos condiciones anidadas, el bucle explícito se entiende mejor y es la opción correcta.',
        completed: false,
      },
      {
        id: 'f3-l4',
        title: 'Archivos, JSON y peticiones HTTP',
        type: 'reading',
        difficulty: 'intermedio',
        content: `## Leer y escribir archivos

\`\`\`python
# leer
with open("datos.txt", "r", encoding="utf-8") as archivo:
    contenido = archivo.read()

# leer línea por línea, sin cargar todo en memoria
with open("grande.csv", "r", encoding="utf-8") as archivo:
    for linea in archivo:
        procesar(linea)

# escribir
with open("salida.txt", "w", encoding="utf-8") as archivo:
    archivo.write("Hola\\n")
\`\`\`

**Usa siempre \`with\`.** Cierra el archivo solo, incluso si ocurre un error a mitad. Y **pon siempre \`encoding="utf-8"\`**: sin eso, Python usa la codificación del sistema y en Windows los acentos y las eñes se rompen.

Los modos: \`"r"\` leer, \`"w"\` escribir desde cero (borra lo que había), \`"a"\` agregar al final.

### JSON

\`\`\`python
import json

# de archivo a diccionario
with open("config.json", "r", encoding="utf-8") as f:
    config = json.load(f)

# de diccionario a archivo
with open("salida.json", "w", encoding="utf-8") as f:
    json.dump(datos, f, indent=2, ensure_ascii=False)

# entre texto y objeto
objeto = json.loads(texto_json)
texto = json.dumps(objeto)
\`\`\`

\`ensure_ascii=False\` es lo que hace que los acentos se guarden legibles en vez de como secuencias de escape.

### CSV

\`\`\`python
import csv

with open("ventas.csv", "r", encoding="utf-8") as f:
    for fila in csv.DictReader(f):     # cada fila es un diccionario
        print(fila["producto"], fila["total"])
\`\`\`

\`DictReader\` usa la primera línea como nombres de columna. Es casi siempre lo que quieres.

### Peticiones HTTP

\`\`\`python
import requests

respuesta = requests.get("https://api.ejemplo.com/productos", timeout=10)
respuesta.raise_for_status()         # lanza excepción si el estado es 4xx o 5xx
productos = respuesta.json()

respuesta = requests.post(
    "https://api.ejemplo.com/pedidos",
    json={"producto_id": 12, "cantidad": 2},
    headers={"Authorization": f"Bearer {token}"},
    timeout=10,
)
\`\`\`

**Pon siempre \`timeout\`.** Sin él, una petición a un servidor que no responde deja tu script colgado para siempre.

### Errores

\`\`\`python
try:
    respuesta = requests.get(url, timeout=10)
    respuesta.raise_for_status()
    datos = respuesta.json()
except requests.Timeout:
    print("El servidor tardó demasiado")
except requests.HTTPError as e:
    print(f"El servidor respondió con error: {e.response.status_code}")
except requests.RequestException as e:
    print(f"Fallo de red: {e}")
\`\`\`

Captura excepciones concretas, de la más específica a la más general. Un \`except\` sin tipo atrapa absolutamente todo, incluidos los errores de programación, y los esconde — el mismo problema que el \`catch\` vacío en JavaScript.

### Rutas

\`\`\`python
from pathlib import Path

ruta = Path("datos") / "ventas.csv"     # funciona en Windows, macOS y Linux
if ruta.exists():
    contenido = ruta.read_text(encoding="utf-8")
\`\`\`

\`pathlib\` evita el clásico problema de las barras invertidas de Windows.`,
        tasks: [
          'Lee un CSV real con DictReader y calcula un total agrupado por alguna columna',
          'Escribe el resultado como JSON con indent=2 y ensure_ascii=False, y comprueba que los acentos se ven bien',
          'Haz una petición a una API pública con timeout y maneja los tres tipos de error por separado',
          'Reescribe una ruta de archivo usando pathlib en vez de concatenar cadenas',
        ],
        tip: 'Si abres un archivo sin encoding="utf-8" el código funciona en tu máquina y falla en la de otro. Es el error que más tiempo hace perder porque no falla siempre, solo a veces y en otro sistema operativo.',
        completed: false,
      },
      {
        id: 'f3-l5',
        title: 'Type hints, módulos y herramientas modernas',
        type: 'reading',
        difficulty: 'profesional',
        content: `## Type hints: TypeScript para Python

Python es dinámico, pero desde la versión 3.5 permite anotar tipos. No los verifica al ejecutar —igual que TypeScript, se borran— pero el editor los usa para autocompletar y avisarte.

\`\`\`python
def calcular_total(precio: float, cantidad: int, iva: float = 0.16) -> float:
    return round(precio * cantidad * (1 + iva), 2)

def buscar_usuario(user_id: str) -> dict | None:
    ...

nombres: list[str] = []
config: dict[str, int] = {}
\`\`\`

En proyectos serios se anotan todas las funciones públicas. Es la misma regla práctica que en TypeScript.

### Estructurar con dataclasses

En vez de pasar diccionarios sueltos, define la forma de tus datos:

\`\`\`python
from dataclasses import dataclass

@dataclass
class Producto:
    nombre: str
    precio: float
    stock: int = 0

p = Producto(nombre="Laptop", precio=1200)
print(p.precio)        # autocompletado real en el editor
\`\`\`

Una \`dataclass\` genera sola el constructor, la comparación y una representación legible. Es el equivalente de una \`interface\` de TypeScript, pero además existe en tiempo de ejecución.

Para validar datos que vienen de fuera, el estándar es **Pydantic**, que es a Python lo que Zod a TypeScript:

\`\`\`python
from pydantic import BaseModel, EmailStr

class Contacto(BaseModel):
    nombre: str
    email: EmailStr
    edad: int

contacto = Contacto(**datos_del_formulario)   # valida y lanza si algo no cuadra
\`\`\`

### Módulos y paquetes

\`\`\`python
# precios.py
def calcular_total(...): ...

# main.py
from precios import calcular_total
import precios
from precios import calcular_total as total
\`\`\`

Un archivo es un módulo. Una carpeta con varios archivos es un paquete.

\`\`\`python
if __name__ == "__main__":
    main()
\`\`\`

Ese bloque significa "ejecuta esto solo si el archivo se corre directamente, no si alguien lo importa". Sin él, importar tu script ejecutaría todo su contenido de golpe.

### Las herramientas del día a día

\`\`\`bash
pip install ruff mypy

ruff check .        # detecta errores y problemas de estilo, muy rápido
ruff format .       # formatea el código
mypy .              # comprueba los type hints
\`\`\`

**Ruff** reemplaza a varias herramientas antiguas y es el estándar actual. **Mypy** hace lo que hace el compilador de TypeScript: verificar que los tipos anotados encajan.

### La biblioteca estándar

Python trae mucho resuelto sin instalar nada:

\`\`\`python
import datetime    # fechas y horas
import re          # expresiones regulares
import os          # sistema operativo y variables de entorno
import collections # Counter, defaultdict — muy útiles para agrupar
import itertools   # combinaciones y agrupaciones
\`\`\`

\`Counter\` en concreto resuelve en una línea el clásico "cuenta cuántas veces aparece cada valor":

\`\`\`python
from collections import Counter
Counter(["a", "b", "a", "c", "a"])     # {'a': 3, 'b': 1, 'c': 1}
\`\`\``,
        tasks: [
          'Anota con type hints todas las funciones de un script tuyo y pásale mypy',
          'Convierte un diccionario que uses en varios sitios en una dataclass',
          'Valida los datos de entrada de tu script con un modelo de Pydantic',
          'Instala ruff, córrelo sobre tu código y corrige lo que reporte',
        ],
        tip: 'Si ya escribiste el módulo de TypeScript, aquí no estás aprendiendo un concepto nuevo sino la misma idea con otra sintaxis: dataclass es interface, Pydantic es Zod, mypy es el compilador. Apoyarte en ese paralelo acelera mucho.',
        completed: false,
      },
      {
        id: 'f3-l6',
        title: 'Proyecto: un script que te ahorre trabajo de verdad',
        type: 'project',
        difficulty: 'profesional',
        projectBrief: `Vas a escribir una herramienta de línea de comandos que resuelva una tarea repetitiva real de tu trabajo. No un ejercicio inventado: algo que hoy haces a mano y que a partir de mañana haga el script.

Ideas que funcionan bien y salen de trabajo real de agencia:

- Leer el CSV de exportación de una plataforma de anuncios y generar un resumen por campaña con coste, conversiones y coste por conversión.
- Recorrer una carpeta de imágenes, renombrarlas con un patrón, convertirlas a WebP y reportar cuánto peso se ahorró.
- Consultar una API pública y guardar un informe en JSON o Markdown listo para enviar a un cliente.
- Revisar una lista de URLs, comprobar cuáles responden con error y generar un reporte.

Lo importante no es el tamaño, es que sea algo que vas a volver a usar.`,
        deliverables: [
          'Repositorio con el script, requirements.txt y un README que explique qué hace y cómo se usa',
          'El script acepta argumentos desde la línea de comandos con argparse, sin rutas escritas dentro del código',
          'Type hints en todas las funciones y una dataclass o modelo de Pydantic para los datos que maneja',
          'Manejo de errores con excepciones concretas: archivo que no existe, formato inválido, fallo de red',
          'Un ejemplo de entrada y otro de salida incluidos en el repositorio',
        ],
        rubrica: [
          'El script corre en una máquina limpia siguiendo solo lo que dice el README',
          'No hay rutas ni claves escritas dentro del código: llegan por argumentos o variables de entorno',
          'Al recibir un archivo que no existe, muestra un mensaje claro en vez de una traza de error',
          'Las funciones están anotadas con type hints y mypy pasa sin errores',
          'Ruff no reporta problemas',
          'Existe el bloque if __name__ == "__main__" y la lógica está en funciones, no suelta',
          'El README explica el problema que resuelve, no solo cómo se ejecuta',
        ],
        tasks: [
          'Elige una tarea repetitiva real que hagas a mano hoy y descríbela en dos frases',
          'Monta el proyecto con su entorno virtual y su requirements.txt',
          'Escribe primero la función central y pruébala en el intérprete interactivo antes de armar el resto',
          'Agrega argparse para los argumentos y el manejo de errores por tipo de excepción',
          'Pásale ruff y mypy, y escribe el README con un ejemplo de uso real',
        ],
        discussionPrompts: [
          '¿Cuánto tiempo te toma esa tarea a mano y cuántas veces al mes la haces? Ese número es el retorno real del script.',
          '¿Qué pasa si el archivo de entrada viene con una columna de más o con un formato distinto al esperado?',
        ],
        tip: 'Elige una tarea que hagas al menos una vez por semana. Un script que usas una sola vez rara vez compensa el tiempo de escribirlo; uno que corres cada semana se paga en el primer mes y se convierte en algo que puedes ofrecerle a un cliente.',
        completed: false,
      },
      {
        id: 'f3-l7',
        title: 'Examen: Python',
        type: 'exam',
        difficulty: 'profesional',
        questions: [
          {
            q: '¿Para qué sirve un entorno virtual y qué pasa si no lo activas antes de instalar?',
            options: [
              'Acelera la ejecución del código; sin él, el script corre más lento',
              'Aísla los paquetes del proyecto; sin activarlo, todo se instala en el Python del sistema y los proyectos se pisan entre sí',
              'Cifra las dependencias para que nadie pueda leerlas',
              'Es obligatorio solo en Windows',
            ],
            correct: 1,
            explanation: 'Python instala paquetes de forma global por defecto, así que dos proyectos que necesiten versiones distintas de la misma biblioteca entran en conflicto. El entorno virtual da a cada proyecto su propia copia aislada. Si la terminal no muestra el prefijo (.venv), no está activo.',
          },
          {
            q: 'En Python, ¿qué papel cumple la indentación?',
            options: [
              'Es solo estética, igual que en JavaScript',
              'Define los bloques de código: una sangría incorrecta cambia el comportamiento del programa o impide que corra',
              'Sirve únicamente dentro de las funciones',
              'Es obligatoria solo cuando se usan type hints',
            ],
            correct: 1,
            explanation: 'Python no usa llaves: la indentación es sintaxis. Una línea sangrada de más o de menos entra o sale de un bloque, lo que puede hacer que algo se ejecute en cada vuelta de un bucle en vez de una sola vez al final.',
          },
          {
            q: '¿Por qué conviene usar .get() en vez de corchetes al leer un diccionario?',
            options: [
              'Porque es más rápido',
              'Porque devuelve None o un valor por defecto si la clave no existe, en vez de lanzar KeyError y detener el programa',
              'Porque los corchetes solo funcionan con claves numéricas',
              'Porque .get() convierte el valor a cadena automáticamente',
            ],
            correct: 1,
            explanation: 'usuario["apodo"] lanza KeyError si la clave falta y corta la ejecución. usuario.get("apodo", "sin apodo") devuelve el valor por defecto. Con datos que vienen de fuera, donde los campos opcionales son la norma, .get() es casi siempre lo correcto.',
          },
          {
            q: '¿Qué hace el bloque if __name__ == "__main__":?',
            options: [
              'Define el punto de entrada obligatorio de todo programa Python',
              'Hace que ese código se ejecute solo si el archivo se corre directamente, y no cuando otro archivo lo importa',
              'Marca el archivo como módulo principal para pip',
              'Activa el entorno virtual automáticamente',
            ],
            correct: 1,
            explanation: 'Cuando importas un módulo, Python ejecuta todo su contenido de arriba abajo. Ese bloque separa lo que es biblioteca reutilizable de lo que es ejecución del script, así que importar tus funciones no dispara el programa entero.',
          },
          {
            q: 'Abres un archivo con open("datos.csv", "r") sin especificar encoding. ¿Qué riesgo corres?',
            options: [
              'Ninguno, Python siempre usa UTF-8 por defecto',
              'Que Python use la codificación del sistema, así que el mismo código funciona en tu máquina y rompe acentos y eñes en otra',
              'Que el archivo quede bloqueado y no se pueda cerrar',
              'Que se borre el contenido del archivo',
            ],
            correct: 1,
            explanation: 'Sin encoding explícito, Python usa la codificación por defecto del sistema, que en Windows no suele ser UTF-8. El resultado es un fallo que no aparece en tu equipo y sí en el de otra persona, que es el tipo de error más caro de diagnosticar.',
          },
          {
            q: '¿Qué relación tienen los type hints de Python con los tipos de TypeScript?',
            options: [
              'Ninguna: los type hints sí se verifican en tiempo de ejecución',
              'Son análogos: sirven al editor y a herramientas como mypy, pero no se comprueban al ejecutar; para validar datos externos se usa Pydantic',
              'Los type hints reemplazan la necesidad de validar datos de entrada',
              'Solo se pueden usar en funciones, no en variables',
            ],
            correct: 1,
            explanation: 'Igual que en TypeScript, los type hints son información para el editor y para el verificador estático, y no imponen nada al ejecutar. Para los datos que llegan de fuera hace falta validación real: Pydantic cumple en Python el mismo papel que Zod en TypeScript.',
          },
        ],
        completed: false,
      },
    ],
    resources: [
      {
        title: 'Documentación oficial de Python en español',
        url: 'https://docs.python.org/es/3/',
        type: 'documentation',
      },
      {
        title: 'Real Python — tutoriales por tema',
        url: 'https://realpython.com/',
        type: 'article',
      },
      {
        title: 'Ruff — el linter y formateador estándar actual',
        url: 'https://docs.astral.sh/ruff/',
        type: 'tool',
      },
      {
        title: 'Pydantic — validación de datos en Python',
        url: 'https://docs.pydantic.dev/latest/',
        type: 'documentation',
      },
      {
        title: 'requests — documentación de la biblioteca HTTP',
        url: 'https://requests.readthedocs.io/en/latest/',
        type: 'documentation',
      },
    ],
  },
  {
    id: 'fund-1',
    number: 1,
    title: 'Línea de comandos, Git y GitHub',
    description: 'El oficio antes del código: moverte por la terminal, versionar tu trabajo y colaborar en GitHub sin romper nada.',
    duration: '2 semanas',
    status: 'available',
    track: 'fundamentos',
    audience: 'aprendizaje',
    lessons: [
      {
        id: 'f1-l1',
        title: 'La terminal: por qué vas a vivir ahí',
        type: 'reading',
        difficulty: 'básico',
        content: `## La terminal no es nostalgia

Cada herramienta moderna que vas a usar —Next.js, Git, Vercel, Supabase, Docker— se instala, se configura y se despliega desde la terminal. No hay botón. Aprenderla no es volver a los años ochenta: es dejar de depender de que alguien te construya una interfaz para cada cosa que necesitas hacer.

La diferencia práctica es esta: una interfaz gráfica te deja hacer lo que su diseñador previó. La terminal te deja combinar comandos que nadie previó.

### Qué terminal usas

- **macOS y Linux**: la que trae el sistema. En macOS conviene instalar iTerm2, pero la de fábrica sirve.
- **Windows**: usa **Git Bash** (viene con Git) o **WSL**. Evita \`cmd.exe\`: la sintaxis no es la misma que verás en cualquier tutorial, y vas a perder tiempo traduciendo.

### Los comandos que resuelven el 90% del día

\`\`\`bash
pwd                  # ¿dónde estoy?
ls                   # ¿qué hay aquí?
ls -la               # ...incluyendo archivos ocultos y permisos
cd carpeta           # entrar a una carpeta
cd ..                # subir un nivel
cd ~                 # ir a tu carpeta personal

mkdir proyecto       # crear carpeta
touch index.html     # crear archivo vacío
cp origen destino    # copiar
mv origen destino    # mover o renombrar
rm archivo           # borrar (NO va a la papelera)
rm -r carpeta        # borrar carpeta y su contenido

cat archivo          # ver el contenido completo
head -20 archivo     # las primeras 20 líneas
tail -20 archivo     # las últimas 20
\`\`\`

### El detalle que te va a morder

\`rm\` no tiene papelera. No hay deshacer. \`rm -rf carpeta\` borra la carpeta, todo lo que contiene y no pregunta. Antes de ejecutar cualquier \`rm\`, corre primero \`ls\` sobre la misma ruta y mira qué hay.

### Encadenar comandos

Aquí empieza lo que la interfaz gráfica no te deja hacer:

\`\`\`bash
# la barra vertical pasa la salida de un comando al siguiente
ls -la | grep ".ts"           # solo los archivos TypeScript
cat log.txt | grep "ERROR"    # solo las líneas con ERROR

# && encadena: el segundo corre solo si el primero salió bien
mkdir proyecto && cd proyecto

# > guarda la salida en un archivo (sobrescribe), >> la agrega al final
ls -la > listado.txt
\`\`\`

### Atajos que te ahorran horas

- **Tab** completa nombres de archivo y carpeta. Úsalo siempre: evita errores de tipeo.
- **Flecha arriba** recupera el comando anterior.
- **Ctrl + C** cancela lo que esté corriendo.
- **Ctrl + L** limpia la pantalla.
- **Ctrl + R** busca en el historial de comandos.`,
        tasks: [
          'Instala Git Bash si estás en Windows, o abre la terminal del sistema si estás en macOS o Linux',
          'Navega hasta tu carpeta de proyectos usando solo cd, pwd y ls — sin tocar el explorador de archivos',
          'Crea una carpeta llamada practica-terminal con tres archivos dentro usando mkdir y touch',
          'Lista solo los archivos que terminen en .txt usando ls y grep encadenados con |',
          'Guarda el listado de tu carpeta en un archivo listado.txt usando >',
        ],
        tip: 'Usa Tab de forma compulsiva. Los desarrolladores con experiencia casi nunca escriben un nombre de archivo completo: escriben tres letras y presionan Tab. Además de rapidez, es la mejor defensa contra los errores de tipeo en rutas.',
        completed: false,
      },
      {
        id: 'f1-l2',
        title: 'Rutas, permisos y cómo está organizado tu disco',
        type: 'reading',
        difficulty: 'básico',
        content: `## Rutas absolutas y relativas

Casi todos los errores de "no encuentra el archivo" son en realidad errores de ruta.

- **Ruta absoluta**: empieza desde la raíz del sistema. \`/Users/gabriel/proyectos/web/index.html\`. Funciona desde cualquier lugar.
- **Ruta relativa**: empieza desde donde estás parado. \`./index.html\`, \`../imagenes/logo.png\`. Depende de tu ubicación actual.

\`\`\`bash
.        # la carpeta actual
..       # la carpeta padre
~        # tu carpeta personal
/        # la raíz del sistema
\`\`\`

Cuando un script falla con "file not found", el primer diagnóstico siempre es el mismo: ejecuta \`pwd\` y pregúntate desde dónde se está resolviendo esa ruta relativa.

### La estructura de un proyecto web típico

\`\`\`
mi-proyecto/
├── .git/              # historial de Git (no se toca a mano)
├── .gitignore         # qué NO se sube al repositorio
├── node_modules/      # dependencias instaladas (nunca se sube)
├── public/            # archivos servidos tal cual: imágenes, fuentes
├── app/               # el código de la aplicación
├── package.json       # dependencias y scripts del proyecto
└── README.md          # qué es esto y cómo se corre
\`\`\`

Los archivos que empiezan con punto están ocultos. Por eso \`ls\` no los muestra y necesitas \`ls -la\`.

### .gitignore: el archivo que evita desastres

Hay tres cosas que nunca deben llegar a un repositorio:

1. **\`node_modules/\`** — son cientos de megas que se reconstruyen con \`npm install\`.
2. **\`.env\` y cualquier archivo con claves** — subir una clave de API a GitHub es filtrarla al mundo, aunque el repositorio sea privado hoy.
3. **Archivos de build** (\`.next/\`, \`dist/\`) — se regeneran.

\`\`\`bash
# .gitignore mínimo de un proyecto Next.js
node_modules/
.next/
.env
.env.local
.DS_Store
\`\`\`

### Permisos, en resumen práctico

En macOS y Linux cada archivo tiene permisos de lectura (r), escritura (w) y ejecución (x). Lo verás así:

\`\`\`
-rw-r--r--   1 gabriel  staff   1420 Sep  3 10:22 index.html
\`\`\`

En el día a día solo necesitas una cosa: si un script no corre y dice "permission denied", dale permiso de ejecución con \`chmod +x script.sh\`.`,
        tasks: [
          'Ejecuta ls -la en la raíz de un proyecto y localiza los archivos ocultos que empiezan con punto',
          'Abre el .gitignore de un proyecto existente y explica en una frase por qué está cada línea',
          'Desde una subcarpeta, escribe la ruta relativa para llegar a un archivo que esté dos niveles arriba',
          'Crea un .gitignore desde cero para un proyecto Next.js con las cinco entradas mínimas',
        ],
        tip: 'Si alguna vez subes una clave por accidente, borrarla en el siguiente commit no la elimina: sigue en el historial y cualquiera puede recuperarla. La única respuesta correcta es rotar esa clave de inmediato en el servicio que la emitió.',
        completed: false,
      },
      {
        id: 'f1-l3',
        title: 'Git: versionar tu trabajo desde cero',
        type: 'reading',
        difficulty: 'básico',
        content: `## Qué problema resuelve Git

Sin control de versiones tu proyecto termina así: \`index.html\`, \`index-final.html\`, \`index-final-v2.html\`, \`index-final-BUENO.html\`. Nadie sabe cuál es el bueno y no hay forma de volver atrás.

Git guarda una fotografía completa de tu proyecto cada vez que se lo pides, con una nota de qué cambiaste y cuándo. Puedes volver a cualquiera de esas fotografías en cualquier momento.

### Las tres zonas

Este es el modelo mental que hay que entender; el resto son comandos.

\`\`\`
Working directory  →  Staging area  →  Repositorio
   (tus archivos)      (git add)       (git commit)
\`\`\`

1. **Working directory**: los archivos como están ahora en tu disco.
2. **Staging area**: lo que has marcado para incluir en el próximo commit. Existe para que puedas guardar solo una parte de lo que cambiaste.
3. **Repositorio**: el historial de commits, permanente.

### El ciclo de todos los días

\`\`\`bash
git init                     # una sola vez, al crear el proyecto
git status                   # ¿qué cambió? — el comando que más vas a usar
git add archivo.ts           # marcar un archivo para el commit
git add .                    # marcar todo lo cambiado
git commit -m "mensaje"      # guardar la fotografía
git log --oneline            # ver el historial
\`\`\`

### Configúrate una vez

\`\`\`bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
\`\`\`

### Escribir buenos mensajes de commit

Un mensaje de commit lo escribes una vez y lo lee tu yo de dentro de seis meses buscando cuándo se rompió algo. "cambios" y "arreglos" no le sirven a nadie.

La convención más extendida es **Conventional Commits**:

\`\`\`bash
git commit -m "feat: agrega formulario de contacto"
git commit -m "fix: corrige cálculo del total en el carrito"
git commit -m "refactor: extrae la lógica de precios a un módulo"
git commit -m "docs: documenta las variables de entorno"
git commit -m "style: unifica el espaciado de las secciones"
\`\`\`

La regla práctica: el mensaje completa la frase "Este commit va a...". Si no puedes describirlo en una línea, probablemente estás metiendo dos cambios en un commit.

### Deshacer cosas

\`\`\`bash
git restore archivo.ts             # descartar cambios no guardados de un archivo
git restore --staged archivo.ts    # sacarlo del staging, sin perder los cambios
git commit --amend -m "mensaje"    # corregir el mensaje del último commit
git revert <hash>                  # crear un commit que deshace otro commit
\`\`\`

\`git revert\` es la forma segura de deshacer algo ya publicado: no borra historia, agrega un commit que revierte. Existe \`git reset --hard\`, que sí borra, y por eso conviene no tocarlo hasta entender bien las consecuencias.`,
        tasks: [
          'Configura tu nombre y email globales en Git',
          'Crea un repositorio nuevo con git init y haz tres commits con mensajes en formato Conventional Commits',
          'Modifica un archivo, ejecuta git status y describe en qué zona está ese cambio antes y después de git add',
          'Usa git log --oneline para ver tu historial y git revert para deshacer el segundo commit',
        ],
        tip: 'Ejecuta git status antes de cada add y antes de cada commit. Es dos segundos y evita el error más común de todos: subir un archivo que no querías, o creer que guardaste algo que sigue sin guardar.',
        completed: false,
      },
      {
        id: 'f1-l4',
        title: 'Ramas, merge y conflictos',
        type: 'reading',
        difficulty: 'intermedio',
        content: `## Por qué existen las ramas

Una rama es una línea de trabajo paralela. Te permite construir algo nuevo sin tocar la versión que funciona, y descartarlo entero si sale mal.

La regla que sostiene todo esto: **la rama principal siempre funciona**. Lo que está en \`main\` se puede desplegar en cualquier momento. Todo lo demás pasa en otra rama.

### Trabajar con ramas

\`\`\`bash
git branch                          # ver las ramas locales
git switch -c feature/contacto      # crear una rama y moverte a ella
git switch main                     # volver a main
git branch -d feature/contacto      # borrar una rama ya integrada
\`\`\`

Verás \`git checkout -b\` en tutoriales viejos: hace lo mismo que \`git switch -c\`, pero \`switch\` es más claro porque hace una sola cosa.

### Nombrar las ramas

\`\`\`
feature/formulario-contacto    # una funcionalidad nueva
fix/error-calculo-total        # una corrección
refactor/limpieza-estilos      # reorganización sin cambio de comportamiento
\`\`\`

### Integrar el trabajo

\`\`\`bash
git switch main
git merge feature/contacto
\`\`\`

Si nadie tocó los mismos archivos, Git integra solo y no tienes que hacer nada.

### Conflictos: qué son y cómo se resuelven

Un conflicto ocurre cuando dos ramas cambiaron **las mismas líneas del mismo archivo**. Git no adivina cuál gana y te pide que decidas. No es un error, es el funcionamiento normal.

Cuando pasa, Git marca el archivo así:

\`\`\`
<<<<<<< HEAD
<h1>Bienvenido a AlphaDev</h1>
=======
<h1>AlphaDev Studios</h1>
>>>>>>> feature/contacto
\`\`\`

Arriba está lo que hay en tu rama actual, abajo lo que trae la otra. Para resolverlo:

1. Abre el archivo y decide cuál texto queda (o escribe uno nuevo que combine ambos).
2. **Borra las tres líneas de marcadores** \`<<<<<<<\`, \`=======\` y \`>>>>>>>\`.
3. Guarda, y luego:

\`\`\`bash
git add archivo.html
git commit                 # cierra el merge
\`\`\`

### El error clásico

Dejar un marcador \`=======\` olvidado en el archivo y hacer commit. El código deja de compilar y el mensaje de error no menciona Git por ningún lado. Antes de cerrar un merge, busca los marcadores:

\`\`\`bash
grep -rn "<<<<<<<" .
\`\`\`

### Mantener tu rama al día

Mientras trabajas en tu rama, \`main\` avanza. Para traer esos cambios:

\`\`\`bash
git switch main
git pull
git switch feature/contacto
git merge main
\`\`\`

Hacerlo seguido significa resolver conflictos pequeños y frecuentes en vez de uno gigante al final.`,
        tasks: [
          'Crea una rama feature/nueva-seccion, agrega una sección al proyecto y haz commit ahí',
          'Vuelve a main, modifica la MISMA línea de ese archivo y haz commit',
          'Intenta el merge y resuelve el conflicto a mano, borrando los tres marcadores',
          'Verifica con grep -rn "<<<<<<<" . que no quedó ningún marcador olvidado antes de cerrar el merge',
        ],
        tip: 'Provoca un conflicto a propósito en un proyecto de práctica y resuélvelo con calma. Es mucho mejor aprender el procedimiento ahora que descubrirlo por primera vez con una entrega encima.',
        completed: false,
      },
      {
        id: 'f1-l5',
        title: 'GitHub: pull requests y trabajo en equipo',
        type: 'reading',
        difficulty: 'intermedio',
        content: `## Git y GitHub no son lo mismo

**Git** es el programa que corre en tu máquina y guarda el historial. **GitHub** es un servicio donde ese historial vive en internet, para que otras personas puedan verlo y colaborar. Puedes usar Git sin GitHub perfectamente.

### Conectar tu repositorio local

\`\`\`bash
git remote add origin https://github.com/usuario/repo.git
git push -u origin main       # la primera vez
git push                      # las siguientes
git pull                      # traer lo que otros subieron
git clone https://github.com/usuario/repo.git   # copiar un repo existente
\`\`\`

### Autenticación: usa SSH

GitHub ya no acepta contraseña para \`push\`. Tienes dos opciones: un token personal o una clave SSH. La clave SSH se configura una vez y no la vuelves a tocar:

\`\`\`bash
ssh-keygen -t ed25519 -C "tu@email.com"
cat ~/.ssh/id_ed25519.pub      # copia esto y pégalo en GitHub > Settings > SSH keys
\`\`\`

### El pull request

Un pull request (PR) es una propuesta de cambio: "traje esto en mi rama, ¿lo integramos?". Es donde ocurre la revisión de código, y donde de verdad se aprende a programar en equipo.

El flujo completo:

\`\`\`bash
git switch -c feature/galeria
# ... trabajas, haces commits ...
git push -u origin feature/galeria
\`\`\`

Después, en GitHub, abres el PR desde la rama hacia \`main\`.

### Un PR que la gente quiere revisar

- **Pequeño.** Un PR de 40 líneas recibe comentarios útiles; uno de 2.000 recibe un "se ve bien" sin que nadie lo haya leído.
- **Con título que dice qué hace**, no en qué archivos toca.
- **Con una descripción** de qué problema resuelve y cómo probarlo.
- **Con capturas** si cambia algo visual.

### Recibir comentarios

Una revisión de código es sobre el código, no sobre ti. Si no entiendes un comentario, pregunta. Si no estás de acuerdo, explica tu razonamiento con argumentos técnicos: a veces quien revisa no tiene el contexto que tú sí tienes.

### Las otras dos cosas que vas a usar

- **Issues**: para registrar tareas y errores. Un issue bien escrito dice qué esperabas, qué pasó y cómo reproducirlo.
- **README.md**: la portada de tu repositorio. Qué es el proyecto, cómo se instala, cómo se corre. Si alguien no puede levantar tu proyecto leyendo el README, el README está incompleto.`,
        tasks: [
          'Configura una clave SSH y verifica que puedes hacer push sin que te pida contraseña',
          'Sube un proyecto tuyo a GitHub con un README que explique qué es, cómo se instala y cómo se corre',
          'Crea una rama, haz push y abre un pull request hacia main con título y descripción claros',
          'Abre un issue describiendo una mejora pendiente: qué esperabas, qué pasa hoy y cómo reproducirlo',
        ],
        tip: 'Tu perfil de GitHub es tu currículum real. Un repositorio con historial limpio, mensajes de commit legibles y un README que se entiende dice más de ti en treinta segundos que cualquier lista de tecnologías.',
        completed: false,
      },
      {
        id: 'f1-l6',
        title: 'Práctica: tu primer proyecto colaborativo',
        type: 'practice',
        difficulty: 'intermedio',
        content: `## El ejercicio

Vas a simular el ciclo completo de trabajo profesional en un repositorio real, tú solo, haciendo los dos papeles: quien propone el cambio y quien lo revisa.

### Preparación

Crea un repositorio en GitHub llamado \`practica-git\` con un README inicial y clónalo a tu máquina.

### Ronda 1 — Una funcionalidad

1. Crea la rama \`feature/perfil\`.
2. Agrega un archivo \`perfil.md\` con tu bio en tres párrafos.
3. Haz al menos dos commits con mensajes en formato Conventional Commits.
4. Sube la rama y abre un pull request.
5. Escribe una descripción real: qué agrega y cómo revisarlo.
6. Revisa tu propio PR en GitHub, deja un comentario en una línea concreta, aplica el cambio y súbelo.
7. Integra el PR y borra la rama.

### Ronda 2 — El conflicto

1. Crea la rama \`fix/titulo\` y cambia el título del README.
2. Sin integrarla, vuelve a \`main\` y cambia **la misma línea** de otra forma.
3. Intenta integrar y resuelve el conflicto a mano.
4. Verifica que no quedó ningún marcador antes de hacer commit.

### Ronda 3 — El desastre controlado

1. Haz un commit con un cambio que rompa algo a propósito.
2. Deshazlo con \`git revert\` en vez de borrar el commit.
3. Explica en el mensaje del revert por qué se revirtió.`,
        tasks: [
          'Completa las tres rondas en un repositorio público llamado practica-git',
          'El historial final debe tener al menos 6 commits, un merge y un revert',
          'El README debe explicar qué es el repositorio y qué practicaste en él',
          'Revisa git log --oneline --graph y comprueba que la historia se entiende sin explicaciones',
        ],
        tip: 'Haz esto en un repositorio de práctica que puedas romper sin consecuencias. La confianza con Git no viene de leer sobre los comandos, viene de haber roto y arreglado un repositorio varias veces.',
        completed: false,
      },
      {
        id: 'f1-l7',
        title: 'Examen: línea de comandos y control de versiones',
        type: 'exam',
        difficulty: 'intermedio',
        questions: [
          {
            q: '¿Cuál es la diferencia entre el staging area y el repositorio en Git?',
            options: [
              'El staging area guarda los archivos en la nube; el repositorio los guarda en tu disco',
              'El staging area es lo que marcaste para el próximo commit; el repositorio es el historial permanente de commits ya guardados',
              'Son lo mismo, staging area es el nombre antiguo del repositorio',
              'El staging area guarda las ramas; el repositorio guarda los archivos',
            ],
            correct: 1,
            explanation: 'Git tiene tres zonas: working directory (tus archivos como están ahora), staging area (lo que marcaste con git add para incluir en el próximo commit) y repositorio (el historial de commits). El staging existe para que puedas guardar solo una parte de lo que cambiaste, en vez de todo junto.',
          },
          {
            q: 'Subiste por accidente un archivo .env con una clave de API a GitHub. ¿Cuál es la respuesta correcta?',
            options: [
              'Borrar el archivo y hacer un commit nuevo: con eso la clave ya no es accesible',
              'Poner el archivo en .gitignore, con eso se elimina del historial',
              'Rotar la clave de inmediato en el servicio que la emitió, porque sigue en el historial y es recuperable',
              'Hacer el repositorio privado: si nadie lo ve, la clave está segura',
            ],
            correct: 2,
            explanation: 'Borrar un archivo en un commit posterior no lo elimina del historial: cualquiera puede recuperar el contenido de cualquier commit anterior. Agregarlo a .gitignore tampoco afecta lo ya versionado. Y hacer el repositorio privado no ayuda si ya estuvo público. La única respuesta correcta es asumir la clave como comprometida y rotarla.',
          },
          {
            q: '¿Qué significa exactamente un conflicto de merge?',
            options: [
              'Que dos ramas modificaron las mismas líneas del mismo archivo y Git no puede decidir cuál gana',
              'Que hay un error de sintaxis en el código de una de las ramas',
              'Que las dos ramas tienen nombres parecidos y Git se confunde',
              'Que una de las ramas está desactualizada y hay que borrarla',
            ],
            correct: 0,
            explanation: 'Un conflicto no es un error: es Git pidiéndote una decisión que no puede tomar solo. Ocurre únicamente cuando los cambios tocan las mismas líneas. Si dos ramas modifican archivos distintos, o partes distintas del mismo archivo, Git integra automáticamente sin preguntar.',
          },
          {
            q: 'Necesitas deshacer un commit que ya está publicado en GitHub y que otras personas ya descargaron. ¿Qué usas?',
            options: [
              'git reset --hard, porque borra el commit del historial',
              'git revert, porque agrega un commit nuevo que deshace los cambios sin reescribir la historia',
              'Borrar el repositorio y volver a subirlo limpio',
              'git commit --amend sobre el commit problemático',
            ],
            correct: 1,
            explanation: 'git revert crea un commit nuevo que aplica los cambios inversos: la historia queda intacta y quien ya descargó el repositorio no tiene problemas. git reset --hard y git commit --amend reescriben la historia, lo que rompe el repositorio de todos los demás cuando el commit ya fue publicado.',
          },
          {
            q: '¿Por qué node_modules/ nunca debe subirse a un repositorio?',
            options: [
              'Porque contiene claves privadas de los paquetes instalados',
              'Porque son cientos de megas que se reconstruyen con npm install a partir de package.json',
              'Porque GitHub cobra por almacenar esos archivos',
              'Porque cambia de nombre en cada sistema operativo',
            ],
            correct: 1,
            explanation: 'node_modules es una carpeta derivada: todo su contenido se reconstruye ejecutando npm install, porque package.json y el lockfile ya declaran exactamente qué instalar. Versionarla infla el repositorio, hace lentísimo cada clone y genera conflictos constantes sin aportar nada.',
          },
        ],
        completed: false,
      },
    ],
    resources: [
      {
        title: 'Pro Git — el libro oficial de Git, gratuito y en español',
        url: 'https://git-scm.com/book/es/v2',
        type: 'documentation',
      },
      {
        title: 'GitHub Docs — Pull requests',
        url: 'https://docs.github.com/en/pull-requests',
        type: 'documentation',
      },
      {
        title: 'Oh My Git! — aprender ramas y merges jugando',
        url: 'https://ohmygit.org/',
        type: 'tool',
      },
      {
        title: 'Conventional Commits — la especificación',
        url: 'https://www.conventionalcommits.org/es/v1.0.0/',
        type: 'documentation',
      },
    ],
  },
  {
    id: 'fund-2',
    number: 2,
    title: 'Errores, depuración y testing',
    description: 'La diferencia entre entregar código y entregar código que no se rompe: manejar fallos, depurar con evidencia y escribir pruebas.',
    duration: '2 semanas',
    status: 'available',
    track: 'fundamentos',
    audience: 'aprendizaje',
    lessons: [
      {
        id: 'f2-l1',
        title: 'Manejar errores: fallar bien',
        type: 'reading',
        difficulty: 'intermedio',
        content: `## Los errores no son excepcionales

Un usuario sin conexión, una API que tarda, un formulario a medio llenar, un archivo que no existe. Todo eso va a pasar. La pregunta no es si tu código va a fallar, sino qué hace cuando falla.

Hay tres respuestas posibles y solo una es aceptable:

1. **Romperse en silencio.** El peor caso: el usuario cree que funcionó.
2. **Romperse en pantalla.** Una traza de error donde debería ir la interfaz.
3. **Fallar de forma controlada.** El usuario entiende qué pasó y qué puede hacer; tú te enteras de que pasó.

### El anti-patrón número uno

\`\`\`js
try {
  await guardarPedido(pedido)
} catch (e) {
  // silencio
}
\`\`\`

Este bloque convierte un error en un misterio. El pedido no se guardó, nadie se enteró, y dentro de tres semanas alguien va a pasar dos días buscando por qué faltan pedidos.

Si capturas un error, tienes que hacer algo con él: mostrarlo, registrarlo o relanzarlo.

\`\`\`js
try {
  await guardarPedido(pedido)
} catch (error) {
  console.error('No se pudo guardar el pedido', { pedidoId: pedido.id, error })
  mostrarAviso('No pudimos guardar tu pedido. Vuelve a intentarlo en un momento.')
  throw error
}
\`\`\`

### Mensajes que sirven

Un mensaje de error tiene dos audiencias distintas y necesita dos textos distintos.

**Para el usuario**: qué pasó y qué puede hacer. Sin jerga, sin disculpas largas, sin códigos.

\`\`\`
Mal:  "Error 500: Internal Server Error"
Mal:  "Ups, algo salió mal :("
Bien: "No pudimos procesar el pago. Revisa los datos de tu tarjeta e inténtalo de nuevo."
\`\`\`

**Para ti**: todo el contexto necesario para reproducirlo. Qué operación, con qué datos, en qué momento.

### Errores esperados y errores de programación

No todo se trata igual:

- **Esperados**: el usuario escribió un email inválido, la tarjeta fue rechazada. Se manejan con lógica normal, no con excepciones.
- **De programación**: llamaste una función con el argumento equivocado. Estos deben fallar fuerte y temprano, para que los descubras tú y no un cliente.

### Validar en la frontera

Valida los datos donde entran al sistema: el formulario, la respuesta de una API, los parámetros de una URL. Una vez validados, el resto del código puede confiar en ellos.

\`\`\`ts
// con Zod, que ya usas en el stack
import { z } from 'zod'

const Contacto = z.object({
  nombre: z.string().min(2),
  email: z.string().email(),
  mensaje: z.string().min(10),
})

const resultado = Contacto.safeParse(datosDelFormulario)
if (!resultado.success) {
  // aquí sabes exactamente qué campo falló y por qué
  return { errores: resultado.error.flatten().fieldErrors }
}
\`\`\``,
        tasks: [
          'Busca en un proyecto tuyo un bloque catch vacío o que solo tenga console.log y arréglalo',
          'Escribe dos versiones del mensaje de un mismo error: una para el usuario y otra para el registro técnico',
          'Agrega validación con Zod a un formulario y muestra el error de cada campo junto a su input',
          'Provoca un fallo de red a propósito (apaga el wifi) y comprueba qué ve el usuario en tu aplicación',
        ],
        tip: 'La prueba real de tu manejo de errores es desconectar internet a mitad de una acción. Si la interfaz se queda cargando para siempre o no dice nada, todavía no está terminado.',
        completed: false,
      },
      {
        id: 'f2-l2',
        title: 'Depurar con evidencia, no con corazonadas',
        type: 'reading',
        difficulty: 'intermedio',
        content: `## El método

Depurar mal es cambiar cosas hasta que funcione. Cuando funciona no sabes por qué, así que tampoco sabes si volverá a romperse.

Depurar bien es una investigación con un método fijo:

1. **Reproduce el error de forma confiable.** Si no puedes provocarlo cuando quieres, no puedes saber si lo arreglaste.
2. **Lee el mensaje completo.** Entero, hasta abajo. La primera línea dice qué pasó; la traza dice dónde.
3. **Formula una hipótesis concreta.** "Creo que \`usuario\` llega como \`undefined\` en la línea 42".
4. **Diseña una comprobación que pueda refutarla.** Imprime el valor, pon un breakpoint.
5. **Confirma o descarta, y repite.**

El paso que casi todos se saltan es el 4. Una hipótesis que no puede fallar no es una hipótesis, es una creencia.

### Reducir el área de búsqueda

Cuando no tienes idea de dónde está el problema, no lo busques: divídelo. Comenta la mitad del código o del flujo. Si el error sigue, está en la mitad que quedó. Si desaparece, está en la que quitaste. Repite. En cinco o seis pasos localizas el punto exacto aunque el archivo tenga mil líneas.

### Las herramientas

**console.log tiene mejores versiones:**

\`\`\`js
console.table(arrayDeObjetos)     // datos tabulares legibles
console.error(objeto)             // con traza de llamadas
console.time('carga')             // medir cuánto tarda algo
console.timeEnd('carga')
\`\`\`

Un truco útil: \`console.log({ usuario, pedido })\` en vez de \`console.log(usuario, pedido)\`. Las llaves conservan los nombres de las variables en la salida.

**El debugger del navegador** es superior a console.log cuando el problema es de estado: pones un breakpoint, la ejecución se detiene y puedes inspeccionar todas las variables en ese instante, además de avanzar línea por línea.

**La pestaña Network** resuelve la mitad de los errores de frontend. Antes de revisar tu código, mira qué respondió el servidor de verdad: el código de estado y el cuerpo de la respuesta.

### Errores de JavaScript que vas a ver

\`\`\`
Cannot read properties of undefined (reading 'nombre')
\`\`\`
Intentaste \`usuario.nombre\` y \`usuario\` es \`undefined\`. El problema casi nunca está en esa línea: está antes, donde \`usuario\` debía haberse llenado.

\`\`\`
Hydration failed because the server rendered HTML didn't match the client
\`\`\`
En Next.js: el servidor y el navegador generaron HTML distinto. Las causas habituales son usar \`Date.now()\`, \`Math.random()\` o \`localStorage\` durante el render.

### Cuando estás atascado

Explica el problema en voz alta, de principio a fin, como si se lo contaras a alguien que no conoce el proyecto. Una cantidad sorprendente de veces encuentras la respuesta a mitad de la explicación, porque te obliga a decir en voz alta el supuesto que estabas dando por cierto sin haberlo verificado.`,
        tasks: [
          'Toma un error real de un proyecto tuyo y documenta los cinco pasos del método hasta encontrar la causa',
          'Usa un breakpoint del navegador en vez de console.log para inspeccionar el estado de un componente',
          'Abre la pestaña Network, provoca una petición fallida y describe qué respondió el servidor',
          'Practica la búsqueda por bisección: comenta la mitad del flujo y localiza un fallo en menos de seis pasos',
        ],
        tip: 'Antes de tocar una línea de código, escribe en una frase qué crees que está pasando. Si no puedes escribirla, todavía no entiendes el problema y cualquier cambio que hagas va a ser adivinanza.',
        completed: false,
      },
      {
        id: 'f2-l3',
        title: 'Qué es testing y por qué te pagan más por saberlo',
        type: 'reading',
        difficulty: 'intermedio',
        content: `## El problema que resuelve

Cambias una función y sin querer rompes algo en otra pantalla. Nadie se entera hasta que un cliente lo reporta. Cuanto más grande es el proyecto, más probable es, y llega un punto en que da miedo tocar nada.

Una prueba automatizada es código que ejecuta tu código y verifica que hizo lo correcto. Su valor real no es encontrar errores hoy: es **avisarte mañana** cuando un cambio rompa algo que antes funcionaba.

Por eso el testing es la línea que separa a quien entrega un proyecto de quien puede mantenerlo durante dos años.

### Los tres niveles

- **Unitarias**: prueban una función aislada. Rápidas, precisas, muchas.
- **De integración**: prueban que varias piezas funcionan juntas (un endpoint que consulta la base de datos).
- **End-to-end**: simulan a un usuario real en un navegador, de principio a fin. Lentas, frágiles, pocas pero valiosas.

La proporción sana: muchas unitarias, algunas de integración, unas pocas end-to-end sobre los flujos que no pueden fallar (registrarse, pagar).

### La estructura de toda prueba

Se llama **Arrange, Act, Assert**: preparas, ejecutas, verificas.

\`\`\`ts
test('calcula el total con IVA', () => {
  // Arrange — preparas los datos
  const productos = [{ precio: 100 }, { precio: 50 }]

  // Act — ejecutas lo que quieres probar
  const total = calcularTotal(productos, 0.16)

  // Assert — verificas el resultado
  expect(total).toBe(174)
})
\`\`\`

### Qué probar y qué no

**Prueba** la lógica de negocio: cálculos, validaciones, transformaciones de datos, reglas de precios, permisos. Es donde los errores cuestan dinero.

**No pruebes** que React renderiza, que la librería de fechas suma días o que el framework enruta. Eso ya lo probaron sus autores.

**Prueba siempre los casos límite**, que es donde vive el 90% de los errores reales:

\`\`\`ts
calcularTotal([], 0.16)              // lista vacía
calcularTotal([{ precio: 0 }], 0.16) // precio cero
calcularTotal(null, 0.16)            // dato ausente
\`\`\`

### Un buen nombre de prueba

El nombre debe decir qué comportamiento se espera, para que cuando falle sepas qué se rompió sin abrir el archivo.

\`\`\`
Mal:  test('calcularTotal')
Mal:  test('caso 3')
Bien: test('devuelve 0 cuando el carrito está vacío')
Bien: test('rechaza un email sin arroba')
\`\`\`

### Cuándo escribirlas

No hace falta adoptar TDD para empezar. La regla más rentable para alguien que arranca: **cada vez que arregles un error, escribe primero una prueba que lo reproduzca.** Falla, arreglas el código, la prueba pasa. Ese error concreto ya no puede volver nunca.`,
        tasks: [
          'Identifica en un proyecto tuyo las tres funciones con más lógica de negocio: son las que hay que probar',
          'Escribe en papel, sin código, cinco casos de prueba para una de ellas incluyendo los casos límite',
          'Clasifica esos cinco casos en unitarios, de integración o end-to-end',
          'Toma un error que hayas arreglado hace poco y escribe el nombre de la prueba que lo habría detectado',
        ],
        tip: 'Si una función es difícil de probar, casi siempre es porque hace demasiadas cosas o depende de algo externo que no controla. La dificultad para probar es una señal de diseño, no un problema del testing.',
        completed: false,
      },
      {
        id: 'f2-l4',
        title: 'Pruebas unitarias en TypeScript con Vitest',
        type: 'reading',
        difficulty: 'profesional',
        content: `## Poner Vitest a andar

Vitest es el corredor de pruebas estándar para proyectos con Vite y Next.js. La configuración mínima:

\`\`\`bash
npm install -D vitest
\`\`\`

\`\`\`json
// package.json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run"
  }
}
\`\`\`

\`vitest\` queda observando y vuelve a correr las pruebas al guardar. \`vitest run\` las corre una vez y termina: es la que usas en integración continua.

### Tu primera prueba

Los archivos van junto al código, con la extensión \`.test.ts\`:

\`\`\`ts
// lib/precios.ts
export function calcularTotal(productos: { precio: number }[], iva: number): number {
  if (!productos || productos.length === 0) return 0
  const subtotal = productos.reduce((acc, p) => acc + p.precio, 0)
  return Math.round(subtotal * (1 + iva) * 100) / 100
}
\`\`\`

\`\`\`ts
// lib/precios.test.ts
import { describe, it, expect } from 'vitest'
import { calcularTotal } from './precios'

describe('calcularTotal', () => {
  it('devuelve 0 cuando no hay productos', () => {
    expect(calcularTotal([], 0.16)).toBe(0)
  })

  it('suma los precios y aplica el IVA', () => {
    expect(calcularTotal([{ precio: 100 }, { precio: 50 }], 0.16)).toBe(174)
  })

  it('redondea a dos decimales', () => {
    expect(calcularTotal([{ precio: 33.333 }], 0.16)).toBe(38.67)
  })
})
\`\`\`

### Las comprobaciones que más vas a usar

\`\`\`ts
expect(valor).toBe(3)                    // igualdad estricta (números, strings)
expect(objeto).toEqual({ a: 1 })         // igualdad por contenido
expect(lista).toHaveLength(3)
expect(texto).toContain('error')
expect(valor).toBeNull()
expect(valor).toBeUndefined()
expect(condicion).toBe(true)
expect(() => funcion()).toThrow()        // que lance un error
await expect(promesa).rejects.toThrow()  // que una promesa falle
\`\`\`

### Probar código asíncrono

\`\`\`ts
it('trae el usuario por id', async () => {
  const usuario = await obtenerUsuario('123')
  expect(usuario.nombre).toBe('Gabriel')
})
\`\`\`

### Simular dependencias externas

Una prueba unitaria no debe llamar a una API real: sería lenta, dependería de internet y fallaría por razones ajenas a tu código. Se reemplaza la dependencia:

\`\`\`ts
import { vi, it, expect } from 'vitest'

it('avisa cuando la API falla', async () => {
  global.fetch = vi.fn().mockResolvedValue({
    ok: false,
    status: 500,
  } as Response)

  const resultado = await cargarProductos()
  expect(resultado.error).toBe('No pudimos cargar los productos')
})
\`\`\`

### Cobertura: úsala con cabeza

\`\`\`bash
npx vitest run --coverage
\`\`\`

La cobertura te dice qué porcentaje de tu código ejecutan las pruebas. Es útil para **encontrar zonas sin probar**, no como meta. Un 100% de cobertura con comprobaciones vacías no prueba nada; un 60% bien elegido sobre la lógica de negocio protege lo que importa.

### La regla de oro

Antes de dar por buena una prueba, **rómpela a propósito**: cambia el código para que falle y confirma que la prueba se pone en rojo. Una prueba que pasa siempre, incluso con el código roto, es peor que no tener prueba, porque da una confianza falsa.`,
        tasks: [
          'Instala Vitest en un proyecto propio y configura los scripts test y test:run',
          'Escribe pruebas para una función de lógica real tuya, cubriendo al menos dos casos límite',
          'Rompe el código a propósito y confirma que cada prueba se pone en rojo',
          'Corre la cobertura e identifica la función con más lógica que no tenga ninguna prueba',
        ],
        tip: 'Empieza por las funciones puras: reciben datos y devuelven datos, sin tocar la base ni el DOM. Son las más fáciles de probar y casi siempre son las que contienen las reglas de negocio que no pueden fallar.',
        completed: false,
      },
      {
        id: 'f2-l5',
        title: 'Proyecto: blinda un módulo real',
        type: 'project',
        difficulty: 'profesional',
        projectBrief: `Toma un proyecto tuyo que ya funcione —el sitio de un cliente, tu portafolio, cualquier cosa con lógica de negocio— y conviértelo en un proyecto que no se rompe en silencio.

No vas a escribir código nuevo: vas a blindar el que ya tienes. Este es exactamente el trabajo que separa un entregable de un producto mantenible, y es lo que un cliente serio revisa antes de confiarte algo más grande.

El alcance es un módulo, no la aplicación entera. Elige el que tenga más lógica: cálculo de precios, validación de un formulario, transformación de datos de una API.`,
        deliverables: [
          'Repositorio en GitHub con el módulo elegido, sus pruebas y un README que explique cómo correrlas',
          'Al menos 8 pruebas unitarias sobre la lógica de negocio, incluyendo casos límite',
          'Manejo de errores completo en el módulo: ningún catch vacío, mensajes separados para usuario y registro',
          'Validación de los datos de entrada con Zod en la frontera del módulo',
          'Un documento de una página con los errores que encontraste al escribir las pruebas',
        ],
        rubrica: [
          'Las pruebas corren con un solo comando y pasan todas en verde',
          'Cada prueba tiene un nombre que describe el comportamiento esperado, no el nombre de la función',
          'Hay al menos tres casos límite cubiertos: entrada vacía, dato ausente y valor fuera de rango',
          'Al romper el código a propósito, las pruebas correspondientes se ponen en rojo',
          'Ningún bloque catch queda vacío ni se limita a un console.log',
          'Los mensajes de error para el usuario no contienen jerga técnica ni códigos de estado',
          'El README explica cómo instalar, cómo correr las pruebas y qué cubre cada grupo',
        ],
        tasks: [
          'Elige el módulo con más lógica de negocio de un proyecto tuyo que ya funcione',
          'Escribe las pruebas ANTES de tocar el manejo de errores: van a revelarte fallos que no sabías que tenías',
          'Documenta cada error que descubras mientras escribes las pruebas',
          'Agrega validación en la frontera y mensajes de error separados por audiencia',
          'Rompe el código a propósito y confirma que las pruebas lo detectan',
        ],
        tip: 'Escribir pruebas sobre código que ya funciona casi siempre revela errores que nadie había notado: divisiones por cero, listas vacías que devuelven NaN, campos opcionales que rompen el cálculo. Documentar esos hallazgos es la mitad del valor del ejercicio.',
        completed: false,
      },
      {
        id: 'f2-l6',
        title: 'Examen: errores, depuración y testing',
        type: 'exam',
        difficulty: 'profesional',
        questions: [
          {
            q: '¿Por qué un bloque catch vacío es peor que no capturar el error?',
            options: [
              'Porque consume más memoria al crear el objeto de error',
              'Porque convierte un fallo visible en un fallo silencioso: la operación no ocurrió y nadie se entera',
              'Porque JavaScript lanza una advertencia en consola cuando detecta un catch vacío',
              'No es peor, es la forma recomendada de ignorar errores que no importan',
            ],
            correct: 1,
            explanation: 'Sin catch, el error se propaga y alguien lo ve. Con un catch vacío, el programa continúa como si todo hubiera salido bien: el pedido no se guardó, el usuario cree que sí, y el fallo aparecerá semanas después como datos faltantes sin ninguna pista de su origen. Si capturas, tienes que registrar, mostrar o relanzar.',
          },
          {
            q: 'En el método de depuración, ¿cuál es el paso que la mayoría se salta?',
            options: [
              'Leer el mensaje de error completo',
              'Reproducir el error de forma confiable',
              'Diseñar una comprobación que pueda refutar la hipótesis',
              'Cambiar el código hasta que funcione',
            ],
            correct: 2,
            explanation: 'Lo habitual es formular una sospecha y pasar directo a cambiar código. Sin una comprobación que pueda demostrar que la hipótesis es falsa, no estás depurando: estás adivinando. Si funciona, no sabes por qué, y no puedes garantizar que no vuelva a ocurrir.',
          },
          {
            q: '¿Cuál es el valor principal de una prueba automatizada?',
            options: [
              'Encontrar los errores que tiene el código hoy',
              'Avisarte mañana cuando un cambio rompa algo que antes funcionaba',
              'Demostrarle al cliente que el código es de calidad',
              'Subir el porcentaje de cobertura del proyecto',
            ],
            correct: 1,
            explanation: 'Los errores de hoy los encuentras probando a mano. Lo que no puedes hacer a mano es volver a comprobar todo el sistema cada vez que tocas una línea. Ese es el valor real: la prueba es una red de seguridad que hace que cambiar el código deje de dar miedo.',
          },
          {
            q: 'Tu prueba pasa en verde. ¿Qué debes hacer antes de darla por buena?',
            options: [
              'Ejecutarla varias veces para confirmar que no es intermitente',
              'Revisar que la cobertura haya subido',
              'Romper el código a propósito y confirmar que la prueba se pone en rojo',
              'Nada: si pasa, está bien escrita',
            ],
            correct: 2,
            explanation: 'Una prueba mal escrita —sin comprobación real, o comprobando algo que siempre es cierto— pasa en verde igual que una buena, pero no protege nada y da confianza falsa. La única forma de saber que la prueba realmente vigila el comportamiento es verla fallar cuando ese comportamiento se rompe.',
          },
          {
            q: 'Estás escribiendo una prueba unitaria de una función que consulta una API externa. ¿Qué haces con esa llamada?',
            options: [
              'La dejas: probar contra la API real es más fiel a la realidad',
              'La reemplazas con una simulación, para que la prueba no dependa de internet ni de un servicio ajeno',
              'Eliminas esa función del alcance de las pruebas',
              'Creas una copia de la API en tu máquina para cada prueba',
            ],
            correct: 1,
            explanation: 'Una prueba unitaria debe verificar tu código y solo tu código. Si llama a una API real, se vuelve lenta, falla sin conexión y puede ponerse en rojo por un problema del proveedor que no tiene nada que ver contigo. Se simula la dependencia y así puedes además probar el caso que más importa: qué hace tu código cuando esa API falla.',
          },
          {
            q: '¿Qué significa que una función sea difícil de probar?',
            options: [
              'Que necesitas una herramienta de testing más avanzada',
              'Que probablemente hace demasiadas cosas o depende de algo externo que no controla',
              'Que esa función no necesita pruebas',
              'Que el lenguaje no está pensado para testing',
            ],
            correct: 1,
            explanation: 'La dificultad para probar es un síntoma de diseño. Una función que lee de la base, calcula y además pinta en pantalla es difícil de probar porque son tres responsabilidades. Separarlas hace el código más fácil de probar y, de paso, más fácil de entender y reutilizar.',
          },
        ],
        completed: false,
      },
    ],
    resources: [
      {
        title: 'Vitest — documentación oficial',
        url: 'https://vitest.dev/guide/',
        type: 'documentation',
      },
      {
        title: 'Zod — validación de esquemas en TypeScript',
        url: 'https://zod.dev/',
        type: 'documentation',
      },
      {
        title: 'Chrome DevTools — depuración de JavaScript',
        url: 'https://developer.chrome.com/docs/devtools/javascript',
        type: 'documentation',
      },
      {
        title: 'Testing Library — probar interfaces como las usa la gente',
        url: 'https://testing-library.com/docs/',
        type: 'documentation',
      },
    ],
  },
  {
    id: 'web-5',
    number: 17,
    title: 'Autenticación en aplicaciones web',
    description: 'Cuentas, sesiones y permisos hechos bien: contraseñas que no se pueden robar, rutas que de verdad están cerradas y recuperación de acceso.',
    duration: '3 semanas',
    status: 'available',
    track: 'web',
    audience: 'aprendizaje',
    lessons: [
      {
        id: 'w5-l1',
        title: 'Autenticación, autorización y dónde vive la verdad',
        type: 'reading',
        difficulty: 'intermedio',
        content: `## Dos preguntas distintas

- **Autenticación**: ¿quién eres? Se resuelve una vez, al entrar.
- **Autorización**: ¿qué puedes ver y hacer? Se resuelve en cada acción.

Confundirlas produce el error más común de todos: sistemas donde iniciar sesión equivale a poder verlo todo. Son capas separadas y las dos hacen falta.

### La regla que sostiene todo

**La verdad vive en el servidor.** Siempre.

El navegador es territorio del usuario: puede abrir las herramientas de desarrollo, editar variables, cambiar respuestas y ejecutar el código que quiera. Cualquier comprobación que hagas solo en el cliente es una sugerencia, no una barrera.

\`\`\`tsx
// Esto NO protege nada
{usuario.esAdmin && <BotonBorrarTodo />}
\`\`\`

Ocultar el botón mejora la experiencia, pero el endpoint que borra sigue ahí y cualquiera puede llamarlo directamente. La comprobación real tiene que estar en el servidor, dentro del endpoint.

### Un caso real: esta misma Academia

La Academia de AlphaDev tuvo exactamente ese problema. La protegía un componente de cliente que comparaba contra una contraseña escrita en el propio código:

\`\`\`tsx
'use client'
const PASSWORD = 'una-contraseña'   // visible en el navegador

if (input === PASSWORD) setUnlocked(true)
\`\`\`

Dos fallos, y el segundo es peor que el primero. Uno: la contraseña se lee abriendo el código de la página. Dos, y más grave: **el contenido de los cursos se descargaba al navegador aunque nunca escribieras la contraseña.** El componente solo decidía qué se *mostraba*, no qué se *enviaba*. Quien pagaba y quien no recibían exactamente los mismos datos.

La corrección no es esconder mejor la contraseña: es que el contenido no salga del servidor sin una sesión válida.

### Los tres factores

- **Algo que sabes**: contraseña, PIN.
- **Algo que tienes**: teléfono, llave física, app de códigos.
- **Algo que eres**: huella, cara.

Pedir dos de categorías distintas es autenticación de dos factores. Contraseña + pregunta de seguridad no es doble factor: las dos son cosas que sabes.

### Qué vas a construir en este módulo

Un sistema de acceso completo: registro, inicio de sesión, sesión persistente, rutas protegidas en el servidor, recuperación de contraseña y permisos por usuario. El mismo que necesita cualquier área privada que cobres.`,
        tasks: [
          'Abre una aplicación que uses a diario y distingue tres acciones de autenticación de tres de autorización',
          'Busca en un proyecto tuyo una comprobación de permisos que solo exista en el cliente',
          'Escribe en una frase por qué ocultar un botón en el frontend no protege el endpoint que hay detrás',
          'Enumera qué datos de tu aplicación no deberían salir del servidor sin una sesión válida',
        ],
        tip: 'La pregunta que hay que hacerse ante cualquier pantalla privada no es "¿se ve el botón?" sino "si llamo al endpoint directamente con curl, ¿qué me responde?". Si responde con datos, no está protegido.',
        completed: false,
      },
      {
        id: 'w5-l2',
        title: 'Contraseñas: por qué nunca se guardan',
        type: 'reading',
        difficulty: 'intermedio',
        content: `## Nadie guarda contraseñas

Ni tú, ni Google, ni tu banco. Lo que se guarda es un **hash**: el resultado de pasar la contraseña por una función que no se puede revertir.

\`\`\`
"miClave123"  →  hash  →  $2b$12$eImiTXuWVxfM37uY4JANjQ...
\`\`\`

Al iniciar sesión, el sistema vuelve a calcular el hash de lo que escribiste y lo compara con el guardado. Nunca necesita conocer la contraseña original. Por eso, cuando olvidas tu contraseña, un servicio serio te deja crear una nueva pero nunca te dice cuál era: no la tiene.

### Por qué no sirve cualquier hash

MD5 y SHA-1 fueron diseñados para ser **rápidos**, y esa es exactamente la propiedad que no quieres. Una tarjeta gráfica calcula miles de millones de hashes MD5 por segundo: probar todas las contraseñas comunes es cuestión de minutos.

Los algoritmos correctos son **bcrypt, scrypt o Argon2**, diseñados para ser lentos y configurables. Si un hash tarda 100 milisegundos, el usuario no lo nota al entrar, pero un atacante pasa de mil millones de intentos por segundo a diez.

### El salt

Dos usuarios con la misma contraseña producirían el mismo hash, y eso permite atacar a muchos a la vez con tablas precalculadas. El **salt** es un valor aleatorio distinto para cada usuario que se mezcla antes de calcular el hash. Bcrypt lo genera e incluye dentro del propio hash: no tienes que gestionarlo tú.

\`\`\`ts
import bcrypt from 'bcryptjs'

// al registrar
const hash = await bcrypt.hash(password, 12)   // 12 = coste

// al iniciar sesión
const coincide = await bcrypt.compare(passwordEscrita, hashGuardado)
\`\`\`

El número de coste es exponencial: 12 tarda el doble que 11. Entre 10 y 12 es lo razonable hoy.

### Requisitos de contraseña que sí sirven

Las reglas clásicas —una mayúscula, un número, un símbolo— empujan a la gente hacia \`Password1!\`, que es predecible. Lo que de verdad importa es la **longitud** y que no sea una contraseña ya filtrada.

- Mínimo 8 caracteres, idealmente 12.
- Permite espacios y frases largas.
- No obligues a cambiarla cada 90 días: eso produce \`Verano2026\`, luego \`Otoño2026\`.
- Compara contra listas de contraseñas filtradas si puedes.

### El error del mensaje que informa de más

\`\`\`
Mal:  "Ese usuario no existe"
Mal:  "Contraseña incorrecta"
Bien: "Email o contraseña incorrectos"
\`\`\`

Los dos primeros le confirman a un atacante qué correos están registrados, que es justo el primer paso de un ataque. El tercero no revela nada. Lo mismo aplica al registro y a la recuperación de contraseña.

### Limitar los intentos

Sin límite, cualquiera puede probar contraseñas indefinidamente. Lo mínimo: contar los intentos fallidos por cuenta y por dirección IP, y aplicar una espera creciente. Con cinco fallos, un minuto de bloqueo detiene la mayoría de los ataques automatizados sin molestar a quien de verdad se equivocó.`,
        tasks: [
          'Instala bcryptjs en un proyecto y guarda un hash de prueba con coste 12',
          'Genera dos hashes de la MISMA contraseña y comprueba que son distintos: ahí ves el salt',
          'Revisa los mensajes de error de inicio de sesión de un proyecto tuyo y unifícalos para que no revelen si el email existe',
          'Diseña en papel una política de intentos fallidos: cuántos, por cuánto tiempo y contra qué se cuenta',
        ],
        tip: 'Si un servicio te envía tu contraseña por correo cuando la olvidas, significa que la guarda en texto plano o reversible. Es motivo suficiente para no confiarle nada importante — y para no hacerlo nunca en lo que tú construyas.',
        completed: false,
      },
      {
        id: 'w5-l3',
        title: 'Sesiones y tokens: cookies, JWT y qué elegir',
        type: 'reading',
        difficulty: 'profesional',
        content: `## El problema

HTTP no recuerda nada: cada petición llega sin saber quién eres. Después de iniciar sesión hay que darle al navegador algo que demuestre, en cada petición siguiente, que ya te identificaste.

Hay dos formas de hacerlo.

### Sesiones en servidor

El servidor genera un identificador aleatorio, lo guarda junto al usuario y se lo entrega al navegador en una cookie. En cada petición busca ese identificador y sabe quién eres.

- **A favor**: puedes cerrar una sesión al instante, borrándola del servidor.
- **En contra**: el servidor tiene que guardar y consultar el estado.

### Tokens (JWT)

El servidor firma un token que contiene los datos del usuario. No guarda nada: verifica la firma en cada petición.

\`\`\`
eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMiLCJyb2wiOiJhZG1pbiJ9.4f3a...
   cabecera            contenido                          firma
\`\`\`

**Lo importante: el contenido de un JWT no está cifrado, solo firmado.** Cualquiera puede leerlo pegándolo en jwt.io. La firma impide modificarlo, no leerlo. Nunca metas datos sensibles dentro.

- **A favor**: el servidor no guarda estado.
- **En contra**: no puedes invalidarlo antes de que expire. Si alguien lo roba, sirve hasta que caduque.

### Cómo se resuelve en la práctica

Un token de acceso de vida corta (15 minutos) más un token de refresco de vida larga, guardado de forma que se pueda revocar. Si roban el de acceso, la ventana de daño es pequeña.

### Dónde se guarda: la decisión que más se equivoca

\`\`\`
localStorage        ❌  cualquier script en tu página puede leerlo
sessionStorage      ❌  el mismo problema
cookie normal       ❌  legible por JavaScript
cookie httpOnly     ✅  el JavaScript de la página no puede tocarla
\`\`\`

Guardar un token en \`localStorage\` significa que cualquier vulnerabilidad de scripting —una dependencia comprometida, un comentario que inyecta HTML— permite robar la sesión. La cookie \`httpOnly\` no es accesible desde JavaScript, así que ese robo deja de ser posible.

\`\`\`ts
// Next.js — cookie de sesión bien configurada
cookies().set('session', token, {
  httpOnly: true,                              // JS no puede leerla
  secure: process.env.NODE_ENV === 'production', // solo por HTTPS
  sameSite: 'lax',                             // mitiga CSRF
  maxAge: 60 * 60 * 24 * 7,                    // 7 días
  path: '/',
})
\`\`\`

Cada opción tapa un agujero concreto: \`httpOnly\` contra el robo por scripts, \`secure\` contra la lectura en redes abiertas, \`sameSite\` contra las peticiones desde otros sitios.

### Supabase Auth

En el stack que usas, Supabase resuelve casi todo esto: registro, inicio de sesión, verificación por correo, recuperación de contraseña y proveedores externos. Emite JWT y, con \`@supabase/ssr\`, los guarda en cookies \`httpOnly\`.

Lo que Supabase **no** decide por ti es la autorización: qué puede ver cada usuario. Eso se define con políticas de Row Level Security en la base y comprobaciones en el servidor. La siguiente lección va sobre eso.`,
        tasks: [
          'Pega un JWT de ejemplo en jwt.io y comprueba que puedes leer su contenido sin ninguna clave',
          'Busca en un proyecto tuyo si algún token se guarda en localStorage y anota qué implicaría un robo',
          'Configura una cookie de sesión con las cuatro opciones y explica qué protege cada una',
          'Compara sesiones en servidor y JWT para un caso concreto tuyo: ¿necesitas cerrar sesiones al instante?',
        ],
        tip: 'Si un token va a localStorage, asume que cualquier script que entre a tu página puede robarlo, incluidas las dependencias que instalas sin leer. La cookie httpOnly convierte ese riesgo en algo que el navegador impide por diseño.',
        completed: false,
      },
      {
        id: 'w5-l4',
        title: 'Proteger rutas de verdad: el servidor decide',
        type: 'reading',
        difficulty: 'profesional',
        content: `## Tres capas, y solo una protege

1. **Ocultar la interfaz** — experiencia de usuario. No protege.
2. **Redirigir en el cliente** — experiencia de usuario. No protege.
3. **Comprobar en el servidor antes de responder** — esto sí protege.

Las dos primeras hacen que la aplicación se sienta bien. La tercera es la que impide que alguien obtenga los datos con una petición directa.

### El middleware: la puerta de entrada

En Next.js, el middleware corre antes de que la petición llegue a la página. Es el lugar natural para cortar el acceso:

\`\`\`ts
// middleware.ts
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session')

  if (!session) {
    const url = new URL('/login', request.url)
    url.searchParams.set('redirect', request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/academia/:path*', '/admin/:path*'],
}
\`\`\`

Guardar en \`redirect\` la ruta que pedía es un detalle pequeño con mucho efecto: después de iniciar sesión vuelve donde estaba, en vez de tirarlo al inicio.

### El middleware no basta

El middleware comprueba que hay sesión, no qué puede ver ese usuario. La comprobación fina va en el Server Component, junto a los datos:

\`\`\`tsx
// app/academia/[rama]/page.tsx
import { redirect, notFound } from 'next/navigation'

export default async function RamaPage({ params }) {
  const { rama } = await params
  const usuario = await getUsuario()          // lee la sesión en el servidor
  if (!usuario) redirect('/login')

  const permitido = await puedeVer(usuario.id, rama)
  if (!permitido) notFound()

  const modulos = await getModulos(rama)      // los datos se leen DESPUÉS de comprobar
  return <RamaContent modulos={modulos} />
}
\`\`\`

El orden importa y no es cosmético: **primero compruebas, después lees.** Si cargas los datos antes, van a viajar al navegador aunque luego decidas no pintarlos.

### El error que cometió esta Academia

Este es exactamente el fallo real que tuvo la Academia de AlphaDev: el contenido de los cursos se importaba en un componente de cliente, así que Next lo incluía en el paquete de JavaScript de la página. La comprobación decidía qué **pintar**, cuando ya era tarde: los datos habían salido del servidor.

La corrección tiene una regla simple detrás: **el contenido que se paga se lee en el servidor, dentro de la función que ya comprobó el permiso, y solo se envía lo que esa persona puede ver.**

### Proteger también los endpoints

Cada Route Handler y cada Server Action necesita su propia comprobación. No heredan la del middleware si están fuera del \`matcher\`, y aunque estuvieran dentro, el middleware solo sabe que hay sesión:

\`\`\`ts
export async function POST(request: Request) {
  const usuario = await getUsuario()
  if (!usuario) return new Response('No autorizado', { status: 401 })
  if (usuario.rol !== 'admin') return new Response('Prohibido', { status: 403 })

  // recién aquí la lógica
}
\`\`\`

**401** es "no sé quién eres"; **403** es "sé quién eres y no puedes".

### Row Level Security

Con Supabase puedes poner la última defensa en la base de datos: reglas que filtran las filas según quién consulta, aunque la consulta venga mal escrita.

\`\`\`sql
create policy "cada quien ve su progreso"
on lesson_progress for select
using (auth.uid() = user_id);
\`\`\`

Es la red que te salva del día en que alguien olvide una comprobación en el código.`,
        tasks: [
          'Escribe un middleware que proteja una ruta y conserve el destino original para volver después de entrar',
          'Toma una página privada tuya y reordena el código: comprobar permiso primero, leer datos después',
          'Prueba tus endpoints con curl sin sesión y confirma que responden 401 y no datos',
          'Escribe una política de Row Level Security para una tabla donde cada usuario solo vea sus propias filas',
        ],
        tip: 'La prueba definitiva es intentar acceder sin sesión con curl o desde una ventana privada. Si tu aplicación te muestra la pantalla de login pero la petición directa al endpoint devuelve datos, no está protegida: está disimulada.',
        completed: false,
      },
      {
        id: 'w5-l5',
        title: 'Recuperación de contraseña y verificación de correo',
        type: 'reading',
        difficulty: 'profesional',
        content: `## El flujo que casi todos dejan a medias

Recuperar el acceso es la parte más olvidada de un sistema de cuentas, y la que más agujeros suele tener. El flujo correcto:

1. El usuario pide recuperar su acceso escribiendo su correo.
2. El servidor genera un token **aleatorio, de un solo uso y con caducidad corta**.
3. Guarda el hash de ese token, no el token.
4. Envía un enlace con el token al correo.
5. El usuario abre el enlace y define una contraseña nueva.
6. El token se marca como usado y **se cierran todas las sesiones activas**.

### Los cuatro errores habituales

**Responder distinto según si el correo existe.** El mensaje debe ser el mismo siempre: *"Si ese correo está registrado, te enviamos las instrucciones"*. De lo contrario, el formulario se convierte en una herramienta para averiguar quién tiene cuenta.

**Tokens predecibles.** Nada de contadores ni del identificador del usuario. Aleatoriedad criptográfica:

\`\`\`ts
import { randomBytes, createHash } from 'crypto'

const token = randomBytes(32).toString('hex')            // esto va en el enlace
const tokenHash = createHash('sha256').update(token).digest('hex')  // esto se guarda
\`\`\`

Se guarda el hash por la misma razón que con las contraseñas: si alguien lee la base de datos, no puede usar los tokens.

**Tokens que no caducan o se reutilizan.** Entre 15 y 60 minutos, y un solo uso. Un enlace de recuperación en una bandeja de correo es una llave permanente si no expira.

**No cerrar las sesiones existentes.** Si alguien entró a la cuenta, cambiar la contraseña sin invalidar sus sesiones no lo echa: sigue dentro.

### Verificación de correo

Sirve para dos cosas: confirmar que el correo es real y que pertenece a quien se registró. El mecanismo es el mismo —token aleatorio con caducidad— y conviene decidir qué puede hacer alguien sin verificar. Lo habitual es dejar entrar pero limitar las acciones sensibles.

### Con Supabase

Supabase trae estos flujos resueltos, incluido el envío de correos:

\`\`\`ts
// pedir recuperación
await supabase.auth.resetPasswordForEmail(email, {
  redirectTo: 'https://alphadev.studio/reset',
})

// definir la contraseña nueva, ya con el enlace abierto
await supabase.auth.updateUser({ password: nuevaPassword })
\`\`\`

Aun usándolo, tú sigues siendo responsable de dos cosas: que el mensaje de la pantalla no revele si el correo existe, y que la página de destino valide el token antes de mostrar el formulario.

### El correo importa

Un correo de recuperación que llega a spam es un usuario perdido. Configura SPF, DKIM y DMARC en tu dominio, y usa un servicio de envío transaccional. Escribe el asunto claro —"Restablece tu contraseña"— y pon el enlace visible, no escondido detrás de una imagen.`,
        tasks: [
          'Implementa el flujo completo de recuperación con token aleatorio, hasheado y con caducidad de 30 minutos',
          'Comprueba que el mensaje es idéntico exista o no el correo en la base',
          'Verifica que el token no se puede usar dos veces y que caduca',
          'Confirma que al cambiar la contraseña se cierran las demás sesiones activas',
        ],
        tip: 'Prueba el flujo entero como si fueras un atacante: pide recuperación para un correo que no existe, reutiliza un enlace ya usado, espera a que caduque y edita el token a mano. Cada uno de esos intentos debe fallar de la misma manera y sin dar pistas.',
        completed: false,
      },
      {
        id: 'w5-l6',
        title: 'Proyecto: área privada con permisos por usuario',
        type: 'project',
        difficulty: 'profesional',
        projectBrief: `Vas a construir el sistema de acceso completo de un área privada real, con permisos que un administrador reparte. Es exactamente el problema que tiene la Academia de AlphaDev en su Fase 2, y el mismo que aparece en cualquier producto que cobre por contenido.

El escenario: una plataforma con contenido dividido en secciones. Hay tres tipos de personas — administradores con acceso total, usuarios con acceso a algunas secciones, y visitantes sin acceso. Un administrador decide quién ve qué, y puede darle a un acceso fecha de vencimiento.

El requisito que define el proyecto: **el contenido de una sección no puede llegar al navegador de alguien que no tenga permiso sobre ella.** No basta con esconderlo.`,
        deliverables: [
          'Aplicación Next.js con registro, inicio de sesión, cierre de sesión y recuperación de contraseña',
          'Middleware que proteja las rutas privadas y conserve el destino original tras iniciar sesión',
          'Tabla de permisos por usuario con alcance (total, por sección) y fecha de vencimiento opcional',
          'Panel de administración para invitar personas y asignar o revocar permisos',
          'Políticas de Row Level Security en la base como última capa de defensa',
          'Un documento con las pruebas de seguridad que hiciste y su resultado',
        ],
        rubrica: [
          'Las contraseñas se guardan hasheadas con bcrypt o mediante Supabase Auth, nunca en texto plano',
          'La sesión viaja en una cookie httpOnly, secure y sameSite, no en localStorage',
          'Pedir un endpoint privado con curl y sin sesión devuelve 401, no datos',
          'Pedir una sección sin permiso devuelve 403 o 404, y el contenido no aparece en la respuesta',
          'El contenido se lee en el servidor después de comprobar el permiso, no antes',
          'El mensaje de inicio de sesión y el de recuperación no revelan si un correo está registrado',
          'Los tokens de recuperación son aleatorios, se guardan hasheados, caducan y son de un solo uso',
          'Un permiso vencido deja de dar acceso sin que nadie tenga que revocarlo a mano',
          'El panel de administración está protegido por rol, comprobado en el servidor',
        ],
        tasks: [
          'Diseña el esquema: usuarios, permisos (usuario, alcance, vencimiento) y contenido por sección',
          'Implementa autenticación con Supabase Auth y cookies httpOnly usando @supabase/ssr',
          'Escribe el middleware de rutas privadas y la comprobación fina en cada Server Component',
          'Construye el panel de administración con comprobación de rol en el servidor',
          'Añade las políticas de Row Level Security y comprueba que funcionan aunque el código falle',
          'Ataca tu propia aplicación: sin sesión, con sesión ajena, con permiso vencido y con curl directo',
        ],
        discussionPrompts: [
          '¿Qué pasa si un usuario mantiene abierta la pestaña cuando le revocas el permiso? ¿En cuánto tiempo debería dejar de funcionar?',
          '¿Conviene que un permiso vencido muestre "tu acceso expiró" o que la sección desaparezca como si no existiera?',
        ],
        tip: 'Haz la prueba de curl antes de dar el proyecto por terminado. Abre una terminal, pide el endpoint de una sección sin enviar ninguna cookie y mira la respuesta completa. Si ahí aparece contenido, el trabajo no está hecho, por muy bien que se comporte la interfaz.',
        completed: false,
      },
      {
        id: 'w5-l7',
        title: 'Examen: autenticación y autorización',
        type: 'exam',
        difficulty: 'profesional',
        questions: [
          {
            q: 'Una aplicación oculta el botón de administrador con {usuario.esAdmin && <Boton />}. ¿Está protegida esa función?',
            options: [
              'Sí, si el usuario no ve el botón no puede ejecutar la acción',
              'No: el endpoint sigue siendo accesible y la comprobación real debe estar en el servidor',
              'Sí, siempre que el componente sea un Server Component',
              'Depende de si la aplicación usa JWT o sesiones en servidor',
            ],
            correct: 1,
            explanation: 'Ocultar la interfaz es experiencia de usuario, no seguridad. Cualquiera puede llamar al endpoint directamente con curl o desde la consola del navegador. La comprobación de permisos tiene que estar dentro del endpoint, en el servidor, donde el usuario no puede modificarla.',
          },
          {
            q: '¿Por qué no se usa MD5 o SHA-1 para hashear contraseñas?',
            options: [
              'Porque producen hashes demasiado largos para guardar en la base de datos',
              'Porque son reversibles y permiten recuperar la contraseña original',
              'Porque fueron diseñados para ser rápidos, y eso permite probar miles de millones de contraseñas por segundo',
              'Porque no aceptan caracteres especiales ni acentos',
            ],
            correct: 2,
            explanation: 'MD5 y SHA-1 no son reversibles, pero sí rapidísimos: una GPU calcula miles de millones por segundo, así que probar todas las contraseñas comunes es cuestión de minutos. Bcrypt, scrypt y Argon2 están diseñados para ser deliberadamente lentos y con coste ajustable, lo que vuelve inviable la fuerza bruta.',
          },
          {
            q: '¿Qué es cierto sobre el contenido de un JWT?',
            options: [
              'Está cifrado, solo el servidor con la clave puede leerlo',
              'Está firmado pero no cifrado: cualquiera puede leerlo, aunque no modificarlo sin invalidar la firma',
              'Está comprimido y por eso resulta ilegible',
              'Solo contiene el identificador de sesión, nunca datos del usuario',
            ],
            correct: 1,
            explanation: 'Un JWT es texto codificado en base64 y firmado. Cualquiera puede pegarlo en jwt.io y leer su contenido completo. La firma garantiza que nadie lo alteró, no que nadie lo lea. Por eso nunca deben ponerse datos sensibles dentro de un token.',
          },
          {
            q: '¿Por qué guardar un token de sesión en localStorage es peor que en una cookie httpOnly?',
            options: [
              'Porque localStorage tiene un límite de tamaño menor',
              'Porque localStorage se borra al cerrar el navegador y obliga a iniciar sesión de nuevo',
              'Porque cualquier script que se ejecute en la página puede leer localStorage, mientras que una cookie httpOnly es inaccesible desde JavaScript',
              'Porque las cookies se envían más rápido al servidor',
            ],
            correct: 2,
            explanation: 'localStorage es accesible desde cualquier JavaScript de la página, incluidas las dependencias que instalas. Una vulnerabilidad de scripting o un paquete comprometido basta para robar la sesión. httpOnly le dice al navegador que no exponga la cookie a JavaScript, así que ese robo deja de ser posible.',
          },
          {
            q: 'En una página privada, ¿cuál es el orden correcto de operaciones en el servidor?',
            options: [
              'Cargar los datos, comprobar el permiso y decidir qué se pinta',
              'Comprobar el permiso y solo después leer los datos que esa persona puede ver',
              'Cargar los datos y filtrarlos en el cliente según el rol',
              'Da igual el orden mientras la comprobación exista en algún punto',
            ],
            correct: 1,
            explanation: 'Si cargas los datos antes de comprobar, esos datos ya salieron del servidor y viajan al navegador aunque después decidas no pintarlos. Es exactamente el fallo que tuvo la Academia: el contenido se incluía en el paquete de JavaScript y la comprobación solo decidía qué mostrar.',
          },
          {
            q: 'En un formulario de recuperación de contraseña, ¿qué debe responder el sistema si el correo no está registrado?',
            options: [
              '"Ese correo no está registrado", para que el usuario sepa que se equivocó',
              'El mismo mensaje que si existiera: "Si ese correo está registrado, te enviamos las instrucciones"',
              'Un error 404 para que el frontend muestre el aviso correspondiente',
              'Ofrecer registrarse con ese correo automáticamente',
            ],
            correct: 1,
            explanation: 'Responder distinto convierte el formulario en una herramienta para averiguar qué correos tienen cuenta, que es el primer paso de un ataque dirigido. El mensaje tiene que ser idéntico en ambos casos, y también el tiempo de respuesta.',
          },
          {
            q: '¿Cuál es la diferencia entre responder 401 y 403?',
            options: [
              '401 es un error del servidor y 403 del cliente',
              '401 significa "no sé quién eres"; 403 significa "sé quién eres y no tienes permiso"',
              '401 se usa para páginas y 403 para endpoints de API',
              'Son equivalentes, se elige uno por convención del equipo',
            ],
            correct: 1,
            explanation: '401 Unauthorized indica falta de autenticación: no hay sesión válida, y la respuesta correcta del cliente es iniciar sesión. 403 Forbidden indica falta de autorización: la sesión es válida pero ese usuario no puede acceder a ese recurso, y volver a iniciar sesión no cambiaría nada.',
          },
        ],
        completed: false,
      },
    ],
    resources: [
      {
        title: 'OWASP — Guía de almacenamiento de contraseñas',
        url: 'https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html',
        type: 'documentation',
      },
      {
        title: 'Supabase Auth — documentación oficial',
        url: 'https://supabase.com/docs/guides/auth',
        type: 'documentation',
      },
      {
        title: 'Next.js — Autenticación y middleware',
        url: 'https://nextjs.org/docs/app/guides/authentication',
        type: 'documentation',
      },
      {
        title: 'jwt.io — inspeccionar y entender tokens JWT',
        url: 'https://jwt.io/',
        type: 'tool',
      },
      {
        title: 'Supabase — Row Level Security',
        url: 'https://supabase.com/docs/guides/database/postgres/row-level-security',
        type: 'documentation',
      },
    ],
  },
  {
    id: 'web-1',
    number: 12,
    title: 'Fundamentos Web: HTML & CSS',
    description: 'Construye la base sólida de todo desarrollo web moderno: estructura semántica, estilos, layouts y responsive design.',
    duration: '3 semanas',
    status: 'available',
    track: 'web',
    lessons: [
      {
        id: 'w1-l1',
        title: 'HTML semántico: estructura que importa',
        type: 'reading',
        content: `## HTML semántico

HTML semántico no es solo usar las etiquetas correctas — es comunicar la *intención* del contenido tanto a navegadores como a motores de búsqueda y lectores de pantalla.

### Por qué importa

- **SEO**: Google lee el HTML. Un \`<h1>\` correcto vale más que 10 palabras clave.
- **Accesibilidad**: Lectores de pantalla dependen de la semántica para navegar.
- **Mantenimiento**: HTML semántico es más fácil de leer y modificar.

### Las etiquetas que más usarás

\`\`\`html
<header>   — cabecera de página o sección
<nav>      — navegación principal
<main>     — contenido principal (único por página)
<section>  — sección temática con heading propio
<article>  — contenido independiente (post, card)
<aside>    — contenido relacionado pero secundario
<footer>   — pie de página o sección
\`\`\`

### Estructura base de cualquier página

\`\`\`html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mi página</title>
</head>
<body>
  <header>
    <nav>...</nav>
  </header>
  <main>
    <section>
      <h1>Título principal</h1>
      <p>Contenido...</p>
    </section>
  </main>
  <footer>...</footer>
</body>
</html>
\`\`\`

### Jerarquía de headings

Usa **un solo \`<h1>\`** por página. Los headings crean un outline lógico:

\`\`\`
h1 — Título de la página
  h2 — Sección principal
    h3 — Subsección
      h4 — Sub-subsección (úsala con cuidado)
\`\`\`

### Tip: formularios semánticos

\`\`\`html
<form>
  <label for="email">Email</label>
  <input type="email" id="email" name="email" required>
  <button type="submit">Enviar</button>
</form>
\`\`\`

El \`label\` con \`for\` conectado al \`id\` del input mejora accesibilidad y UX (click en label activa el input).`,
        completed: false,
      },
      {
        id: 'w1-l1b',
        title: 'Mini-práctica: Escribe el HTML de tu página "Sobre mí"',
        type: 'practice',
        tasks: [
          'Crea un archivo index.html con estructura semántica completa (header, main, footer)',
          'Incluye nav con 3 links (aunque sean #), main con h1 + 2 secciones, footer con tu nombre',
          'Valida el HTML en validator.w3.org — cero errores antes de continuar',
          'Agrega una sección <article> con una mini-bio de 3 párrafos',
        ],
        tip: 'No uses <div> para nada que tenga una etiqueta semántica equivalente. Si dudas, pregúntate: ¿esta etiqueta describe QUÉ es el contenido?',
        completed: false,
      },
      {
        id: 'w1-l2',
        title: 'CSS moderno: Flexbox, Grid y el box model',
        type: 'reading',
        content: `## CSS moderno

CSS en 2025 es más poderoso que nunca. Dominar el box model, Flexbox y Grid te da el 90% de lo que necesitas para cualquier layout.

### El Box Model

Todo elemento HTML es una caja:

\`\`\`
┌─────────────────────────┐
│         margin          │
│  ┌───────────────────┐  │
│  │      border       │  │
│  │  ┌─────────────┐  │  │
│  │  │   padding   │  │  │
│  │  │  ┌───────┐  │  │  │
│  │  │  │content│  │  │  │
│  │  │  └───────┘  │  │  │
│  │  └─────────────┘  │  │
│  └───────────────────┘  │
└─────────────────────────┘
\`\`\`

**Regla de oro**: usa siempre \`box-sizing: border-box\`:

\`\`\`css
*, *::before, *::after {
  box-sizing: border-box;
}
\`\`\`

Esto hace que padding y border se incluyan en el width, no se sumen.

### Flexbox — para layouts de una dimensión

\`\`\`css
.container {
  display: flex;
  justify-content: space-between; /* eje principal (horizontal) */
  align-items: center;            /* eje cruzado (vertical) */
  gap: 1rem;
}
\`\`\`

Casos de uso ideales: navbars, cards en fila, centrar un elemento.

### Grid — para layouts de dos dimensiones

\`\`\`css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

/* Layout complejo */
.layout {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 250px 1fr;
}
\`\`\`

### Responsive con CSS moderno

\`\`\`css
/* Fluid grid sin media queries */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}

/* Fluid typography */
.heading {
  font-size: clamp(1.5rem, 4vw, 3rem);
}

/* Media queries cuando sí son necesarias */
@media (max-width: 768px) {
  .nav-links { display: none; }
}
\`\`\`

### Custom Properties (variables CSS)

\`\`\`css
:root {
  --color-primary: #9A7235;
  --spacing-md: 1rem;
  --radius: 0.5rem;
}

.button {
  background: var(--color-primary);
  padding: var(--spacing-md);
  border-radius: var(--radius);
}
\`\`\`

Variables CSS son la base de cualquier design system.`,
        completed: false,
      },
      {
        id: 'w1-l2b',
        title: 'Mini-práctica: Dale estilos a tu página "Sobre mí"',
        type: 'practice',
        tasks: [
          'Define custom properties en :root para colores, tipografía y espaciado',
          'Usa Flexbox para el navbar (logo a la izquierda, links a la derecha)',
          'Usa Grid para una sección de skills o proyectos (3 columnas en desktop, 1 en mobile)',
          'Implementa al menos 1 media query para adaptar el layout en pantallas pequeñas',
          'Prueba en Chrome DevTools en mobile view — debe verse bien en 375px de ancho',
        ],
        tip: 'Empieza con mobile-first: escribe los estilos base para mobile y usa media queries con min-width para desktop. Es más fácil agregar complejidad que quitarla.',
        completed: false,
      },
      {
        id: 'w1-l3',
        title: 'Tipografía web, colores y accesibilidad visual',
        type: 'reading',
        content: `## Tipografía web y accesibilidad visual

El 95% de la información en la web es texto. Dominar tipografía es dominar diseño web.

### Cargar fuentes correctamente

\`\`\`html
<!-- Google Fonts — en el <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
\`\`\`

\`\`\`css
body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}
\`\`\`

### Escala tipográfica

Una escala consistente crea armonía visual:

\`\`\`css
:root {
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */
}
\`\`\`

### Contraste de color (WCAG)

Para que el texto sea legible y accesible:

- **Normal text**: ratio mínimo 4.5:1
- **Large text** (18px+ o 14px+ bold): ratio mínimo 3:1
- **UI components**: ratio mínimo 3:1

Herramienta gratuita: **coolors.co/contrast-checker**

\`\`\`css
/* ✅ Buen contraste */
color: #1A1512;
background: #FAFAF7;

/* ❌ Mal contraste */
color: #999999;
background: #FFFFFF;
\`\`\`

### Line-height y letter-spacing

\`\`\`css
body {
  line-height: 1.65; /* Cómodo para lectura de párrafos */
}

h1, h2 {
  line-height: 1.2;  /* Headings más apretados */
  letter-spacing: -0.02em; /* Tracking negativo en display */
}

.caption {
  letter-spacing: 0.05em; /* Tracking positivo en texto pequeño */
  text-transform: uppercase;
}
\`\`\`

### Measure (longitud de línea)

La longitud ideal de una línea de texto es **60-75 caracteres**:

\`\`\`css
.content {
  max-width: 65ch; /* ch = ancho del carácter '0' */
}
\`\`\``,
        completed: false,
      },
      {
        id: 'w1-l3b',
        title: 'Mini-práctica: Refinamiento tipográfico y paleta de colores',
        type: 'practice',
        tasks: [
          'Integra Google Fonts a tu proyecto (elige 1-2 fuentes complementarias)',
          'Define una escala tipográfica con custom properties y aplícala consistentemente',
          'Verifica el contraste de todos tus colores de texto en coolors.co/contrast-checker',
          'Limita el ancho de tus párrafos a max 65ch para legibilidad óptima',
          'Documenta tu paleta de colores en un comentario CSS con los hex codes y sus usos',
        ],
        tip: 'Empareja una fuente serif (Playfair Display, Lora) con una sans-serif (Inter, Plus Jakarta Sans) para dar jerarquía visual sin necesitar muchos tamaños distintos.',
        completed: false,
      },
          {
        id: 'web-1-proj-basico',
        title: 'Proyecto Básico: Landing page con HTML y CSS',
        type: 'project',
        difficulty: 'básico',
        projectBrief: 'Construye una landing page completa con HTML, CSS y mínimo JavaScript. Responsiva y publicada en internet.',
        deliverables: [
          'Landing page con hero, 3 secciones de contenido y footer',
          'Responsive: bien en mobile (375px), tablet (768px) y desktop (1280px)',
          'URL pública en Vercel, Netlify o GitHub Pages',
          'Screenshot de Lighthouse con Performance > 85',
        ],
        tip: 'Empieza por el mobile layout. Escalar a desktop es más fácil que reducir.',
        completed: false,
      },
      {
        id: 'web-1-proj-inter',
        title: 'Proyecto Intermedio: Landing page con Next.js + Tailwind',
        type: 'project',
        difficulty: 'intermedio',
        projectBrief: 'Construye una landing page con el stack moderno: Next.js App Router + TypeScript + Tailwind CSS + formulario funcional.',
        deliverables: [
          'Proyecto Next.js con TypeScript strict y estructura App Router correcta',
          'Cero \'any\' — todo tipado correctamente',
          'Formulario de contacto con validación cliente y servidor (Zod)',
          'Animaciones de entrada en CSS puro (no librerías)',
          'Deploy en Vercel con URL pública',
          'Lighthouse Performance > 90 en mobile',
        ],
        tip: 'Si tardas más de 5 minutos decidiendo Server vs Client Component, aplica la regla: si necesita estado, eventos o hooks del browser → Client. Todo lo demás → Server.',
        completed: false,
      },
],
    resources: [
      {
        title: 'MDN Web Docs — HTML Reference',
        url: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
        type: 'documentation',
      },
      {
        title: 'CSS Tricks — A Complete Guide to Flexbox',
        url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox',
        type: 'article',
      },
      {
        title: 'CSS Tricks — A Complete Guide to Grid',
        url: 'https://css-tricks.com/snippets/css/complete-guide-grid',
        type: 'article',
      },
      {
        title: 'Google Fonts',
        url: 'https://fonts.google.com',
        type: 'tool',
      },
    ],
  },
  {
    id: 'web-2',
    number: 13,
    title: 'JavaScript Moderno (ES2024)',
    description: 'De las bases de JS a async/await, fetch y manipulación del DOM — el lenguaje que da vida a cualquier interfaz web.',
    duration: '4 semanas',
    status: 'available',
    track: 'web',
    lessons: [
      {
        id: 'w2-l1',
        title: 'Variables, funciones y el flujo de JavaScript',
        type: 'reading',
        content: `## JavaScript moderno: las bases

JavaScript es el único lenguaje que corre nativamente en el navegador. Entenderlo bien es no-negociable para cualquier desarrollador web.

### Variables

\`\`\`javascript
// const — valor que no cambia (úsala por default)
const nombre = 'Gabriel';
const API_URL = 'https://api.ejemplo.com';

// let — valor que puede cambiar
let contador = 0;
contador = contador + 1;

// var — NO usar (scope confuso, problemático)
\`\`\`

### Tipos de datos

\`\`\`javascript
const texto = 'Hola mundo';          // string
const numero = 42;                    // number
const decimal = 3.14;                 // number (no hay int separado)
const activo = true;                  // boolean
const vacio = null;                   // null (ausencia intencional)
const indefinido = undefined;         // undefined
const objeto = { nombre: 'Gabriel' }; // object
const lista = [1, 2, 3];             // array (también es object)
\`\`\`

### Funciones

\`\`\`javascript
// Declaración clásica
function saludar(nombre) {
  return \`Hola, \${nombre}!\`;
}

// Arrow function (moderna, más concisa)
const saludar = (nombre) => \`Hola, \${nombre}!\`;

// Con múltiples líneas
const calcular = (a, b) => {
  const resultado = a + b;
  return resultado;
};

// Parámetros por default
const conectar = (host = 'localhost', puerto = 3000) => {
  return \`\${host}:\${puerto}\`;
};
\`\`\`

### Destructuring (muy usado en React)

\`\`\`javascript
// Objetos
const usuario = { nombre: 'Gabriel', email: 'g@mail.com', rol: 'admin' };
const { nombre, email } = usuario;

// Con renombrado
const { nombre: nombreUsuario } = usuario;

// Arrays
const colores = ['rojo', 'verde', 'azul'];
const [primero, segundo] = colores;

// En parámetros de función
const mostrarUsuario = ({ nombre, rol }) => {
  console.log(\`\${nombre} — \${rol}\`);
};
\`\`\`

### Spread y Rest

\`\`\`javascript
// Spread: expandir
const extras = { admin: false };
const usuarioCompleto = { ...usuario, ...extras };

// Rest: agrupar el resto
const [cabeza, ...cola] = [1, 2, 3, 4, 5];
// cabeza = 1, cola = [2, 3, 4, 5]
\`\`\`

### Array methods esenciales

\`\`\`javascript
const productos = [
  { nombre: 'Laptop', precio: 1200 },
  { nombre: 'Mouse', precio: 25 },
  { nombre: 'Teclado', precio: 80 },
];

// map — transforma cada elemento
const nombres = productos.map(p => p.nombre);
// ['Laptop', 'Mouse', 'Teclado']

// filter — filtra según condición
const caros = productos.filter(p => p.precio > 50);

// find — primer elemento que cumple
const laptop = productos.find(p => p.nombre === 'Laptop');

// reduce — acumula en un valor
const total = productos.reduce((acc, p) => acc + p.precio, 0);
// 1305
\`\`\``,
        completed: false,
      },
      {
        id: 'w2-l1b',
        title: 'Mini-práctica: Manipula datos con JS puro',
        type: 'practice',
        tasks: [
          'Crea un array de 5 objetos "proyecto" con propiedades: titulo, tecnologia, año, destacado (boolean)',
          'Usa .filter() para obtener solo los proyectos destacados',
          'Usa .map() para crear un array de strings con formato "titulo — tecnologia (año)"',
          'Usa .find() para encontrar el proyecto más reciente',
          'Usa .reduce() para contar cuántos proyectos hay por tecnología (resultado: objeto)',
          'Consola todos los resultados con console.log descriptivos',
        ],
        tip: 'Encadena métodos cuando tenga sentido: productos.filter(...).map(...). Pero si la cadena supera 3 métodos, considera variables intermedias para legibilidad.',
        completed: false,
      },
      {
        id: 'w2-l2',
        title: 'DOM: hacer que la página responda al usuario',
        type: 'reading',
        content: `## Manipulación del DOM

El DOM (Document Object Model) es la representación en JavaScript de tu HTML. Manipularlo es cómo haces que las páginas sean interactivas.

### Seleccionar elementos

\`\`\`javascript
// querySelector — el más versátil (CSS selectors)
const titulo = document.querySelector('h1');
const boton = document.querySelector('.btn-primary');
const form = document.querySelector('#contact-form');

// querySelectorAll — todos los que coincidan (NodeList)
const cards = document.querySelectorAll('.card');
cards.forEach(card => console.log(card));

// getElementById — específico para IDs (más rápido)
const nav = document.getElementById('navbar');
\`\`\`

### Modificar elementos

\`\`\`javascript
// Contenido
titulo.textContent = 'Nuevo título'; // solo texto, seguro
titulo.innerHTML = '<span>Título</span>'; // HTML (cuidado con XSS)

// Estilos
boton.style.backgroundColor = '#9A7235';
boton.style.display = 'none'; // ocultar

// Clases
elemento.classList.add('activo');
elemento.classList.remove('oculto');
elemento.classList.toggle('expandido');
elemento.classList.contains('activo'); // → boolean

// Atributos
input.setAttribute('disabled', true);
input.getAttribute('placeholder');
imagen.src = 'nueva-foto.jpg';
\`\`\`

### Eventos

\`\`\`javascript
// Click
boton.addEventListener('click', (event) => {
  event.preventDefault(); // evita comportamiento default (útil en forms)
  console.log('Botón clickeado');
});

// Input en tiempo real
const searchInput = document.querySelector('#search');
searchInput.addEventListener('input', (e) => {
  console.log(e.target.value);
});

// Submit de formulario
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const datos = new FormData(e.target);
  const email = datos.get('email');
  console.log(email);
});

// Múltiples elementos (event delegation)
document.querySelector('.lista').addEventListener('click', (e) => {
  if (e.target.matches('.item')) {
    e.target.classList.toggle('completado');
  }
});
\`\`\`

### Crear y remover elementos

\`\`\`javascript
// Crear
const card = document.createElement('div');
card.className = 'card';
card.textContent = 'Nueva card';

// Agregar al DOM
const contenedor = document.querySelector('.grid');
contenedor.appendChild(card);

// O con insertAdjacentHTML (más eficiente para HTML complejo)
contenedor.insertAdjacentHTML('beforeend', \`
  <div class="card">
    <h3>Título</h3>
    <p>Descripción</p>
  </div>
\`);

// Remover
card.remove();
\`\`\``,
        completed: false,
      },
      {
        id: 'w2-l2b',
        title: 'Mini-práctica: Lista de proyectos interactiva',
        type: 'practice',
        tasks: [
          'Crea una lista de 5 proyectos en JS (array de objetos) y renderízalos dinámicamente al DOM con insertAdjacentHTML',
          'Agrega un input de búsqueda que filtre proyectos en tiempo real (evento "input")',
          'Agrega un botón "Destacar" en cada card que toggle una clase CSS "destacado"',
          'Agrega un contador que muestre cuántos proyectos están destacados',
          'Implementa un botón "Agregar proyecto" que solicite nombre con prompt() y lo agregue a la lista',
        ],
        tip: 'Para actualizar la lista al filtrar, limpia el contenedor con innerHTML = "" y renderiza de nuevo con el array filtrado. Es menos eficiente que técnicas virtuales, pero correcto para aprender.',
        completed: false,
      },
      {
        id: 'w2-l3',
        title: 'Async JS: Fetch, Promises y async/await',
        type: 'reading',
        content: `## JavaScript asíncrono

El código asíncrono te permite hacer requests HTTP, leer archivos y esperar operaciones lentas sin bloquear la interfaz.

### El problema del código sincrónico

\`\`\`javascript
// ❌ Esto bloquearía el navegador:
const datos = fetchDatos(); // imaginemos que tarda 2 segundos
mostrar(datos); // mientras espera, nada funciona
\`\`\`

### Promises

Una Promise representa un valor futuro — puede estar pendiente, resuelta o rechazada.

\`\`\`javascript
const promesa = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() > 0.5) {
      resolve('Éxito');
    } else {
      reject(new Error('Falló'));
    }
  }, 1000);
});

promesa
  .then(resultado => console.log(resultado))
  .catch(error => console.error(error));
\`\`\`

### async/await — la forma moderna

\`\`\`javascript
// async convierte la función en asíncrona
const obtenerUsuario = async (id) => {
  try {
    // await "pausa" hasta que la Promise se resuelva
    const respuesta = await fetch(\`https://api.ejemplo.com/users/\${id}\`);

    if (!respuesta.ok) {
      throw new Error(\`Error HTTP: \${respuesta.status}\`);
    }

    const usuario = await respuesta.json();
    return usuario;
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    throw error; // re-throw para que el caller pueda manejarlo
  }
};

// Usar la función async
const mostrarUsuario = async () => {
  const usuario = await obtenerUsuario(1);
  document.querySelector('.nombre').textContent = usuario.name;
};

mostrarUsuario();
\`\`\`

### Fetch API

\`\`\`javascript
// GET
const response = await fetch('https://jsonplaceholder.typicode.com/posts');
const posts = await response.json();

// POST
const response = await fetch('https://api.ejemplo.com/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': \`Bearer \${token}\`,
  },
  body: JSON.stringify({
    title: 'Mi post',
    body: 'Contenido...',
    userId: 1,
  }),
});
const nuevoPost = await response.json();
\`\`\`

### Promise.all — paralelo

\`\`\`javascript
// ❌ Secuencial (lento: 3 segundos total)
const usuarios = await obtenerUsuarios();
const posts = await obtenerPosts();
const comentarios = await obtenerComentarios();

// ✅ Paralelo (rápido: máximo 1 segundo)
const [usuarios, posts, comentarios] = await Promise.all([
  obtenerUsuarios(),
  obtenerPosts(),
  obtenerComentarios(),
]);
\`\`\``,
        completed: false,
      },
      {
        id: 'w2-l3b',
        title: 'Mini-práctica: Conecta tu app con una API real',
        type: 'practice',
        tasks: [
          'Usa la API pública JSONPlaceholder (jsonplaceholder.typicode.com) para obtener 10 posts',
          'Renderiza los posts en el DOM con título y cuerpo, mostrando un loading state mientras carga',
          'Agrega manejo de errores: si el fetch falla, muestra un mensaje de error al usuario',
          'Implementa un botón "Recargar" que vuelva a hacer el fetch',
          'Bonus: agrega un input que filtre posts por contenido del título en tiempo real',
        ],
        tip: 'Siempre muestra feedback al usuario: un spinner mientras carga, un mensaje si hay error, y el contenido cuando llega. Nunca dejes la interfaz en silencio mientras espera.',
        completed: false,
      },
          {
        id: 'web-2-proj-inter',
        title: 'Proyecto Intermedio: Componente React reutilizable',
        type: 'project',
        difficulty: 'intermedio',
        projectBrief: 'Diseña e implementa un componente React completamente tipado y reutilizable que funcione en 3 contextos diferentes.',
        deliverables: [
          'Componente React con TypeScript: interfaz Props completa y documentada',
          'Al menos 3 variantes (size, variant o state)',
          'Demo page mostrando todas las variantes',
          'README: cómo usarlo, qué props acepta y ejemplos de código',
        ],
        tip: 'Un componente bien diseñado tiene una sola responsabilidad. Si el nombre tiene un "y" en el medio, probablemente son dos componentes.',
        completed: false,
      },
      {
        id: 'web-2-proj-pro',
        title: 'Proyecto Profesional: App full-stack con autenticación',
        type: 'project',
        difficulty: 'profesional',
        projectBrief: 'Construye una aplicación web completa con Next.js, autenticación de usuarios y persistencia de datos.',
        deliverables: [
          'Next.js App Router con TypeScript strict — cero \'any\'',
          'Autenticación completa: registro, login, sesión (NextAuth.js o Supabase Auth)',
          'Al menos 3 páginas protegidas que requieran login',
          'Base de datos con mínimo 2 tablas relacionadas (Supabase o similar)',
          'API routes tipadas con validación Zod',
          'Deploy en Vercel con .env configurado',
          'README con instrucciones de setup desde cero',
        ],
        rubrica: [
          'Las rutas protegidas son inaccesibles sin auth (no solo hidden en UI)',
          'La validación ocurre en cliente y en servidor',
          'Las variables sensibles están en .env y no committeadas',
          'La app funciona siguiendo solo el README',
        ],
        tip: 'Dibuja el esquema de base de datos antes de codear. Un schema mal pensado al inicio cuesta 10x reescribir al final.',
        completed: false,
      },
],
    resources: [
      {
        title: 'javascript.info — The Modern JavaScript Tutorial',
        url: 'https://javascript.info',
        type: 'course',
      },
      {
        title: 'JSONPlaceholder — Free Fake REST API',
        url: 'https://jsonplaceholder.typicode.com',
        type: 'tool',
      },
      {
        title: 'MDN — Fetch API',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API',
        type: 'documentation',
      },
    ],
  },
  {
    id: 'web-3',
    number: 15,
    title: 'React y Next.js App Router',
    description: 'Construye interfaces modernas con componentes reutilizables, estado reactivo y el poder del App Router de Next.js.',
    duration: '5 semanas',
    status: 'available',
    track: 'web',
    lessons: [
      {
        id: 'w3-l1',
        title: 'React: componentes, props y estado',
        type: 'reading',
        content: `## React: el pensamiento en componentes

React es una librería para construir interfaces como árbol de componentes reutilizables. Cada componente es una función que recibe datos (props) y retorna JSX.

### Tu primer componente

\`\`\`tsx
// Un componente es una función que retorna JSX
const Saludo = () => {
  return <h1>Hola desde React</h1>;
};

// Con props (propiedades — datos que recibe el componente)
interface CardProps {
  titulo: string;
  descripcion: string;
  destacado?: boolean; // opcional
}

const Card = ({ titulo, descripcion, destacado = false }: CardProps) => {
  return (
    <div className={\`card \${destacado ? 'card--destacada' : ''}\`}>
      <h2>{titulo}</h2>
      <p>{descripcion}</p>
    </div>
  );
};
\`\`\`

### useState — estado local del componente

\`\`\`tsx
import { useState } from 'react';

const Contador = () => {
  // [valor, función para actualizarlo]
  const [count, setCount] = useState(0);
  const [nombre, setNombre] = useState('');

  return (
    <div>
      <p>Contador: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(0)}>Reset</button>

      <input
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Tu nombre"
      />
      <p>Hola, {nombre || 'visitante'}</p>
    </div>
  );
};
\`\`\`

### Renderizado de listas

\`\`\`tsx
interface Proyecto {
  id: number;
  titulo: string;
  tecnologia: string;
}

const proyectos: Proyecto[] = [
  { id: 1, titulo: 'Portfolio', tecnologia: 'Next.js' },
  { id: 2, titulo: 'E-commerce', tecnologia: 'React' },
];

const ListaProyectos = () => {
  return (
    <ul>
      {proyectos.map((proyecto) => (
        // key es obligatorio — ayuda a React a identificar elementos
        <li key={proyecto.id}>
          {proyecto.titulo} — {proyecto.tecnologia}
        </li>
      ))}
    </ul>
  );
};
\`\`\`

### useEffect — efectos secundarios

\`\`\`tsx
import { useState, useEffect } from 'react';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Se ejecuta después de que el componente se monta
    const fetchPosts = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await res.json();
      setPosts(data.slice(0, 10));
      setLoading(false);
    };

    fetchPosts();
  }, []); // [] = solo al montar, sin dependencias

  if (loading) return <p>Cargando...</p>;

  return (
    <ul>
      {posts.map((post: any) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
};
\`\`\``,
        completed: false,
      },
      {
        id: 'w3-l1b',
        title: 'Mini-práctica: Tu primera app React con estado',
        type: 'practice',
        tasks: [
          'Crea un componente TodoList con useState para manejar una lista de tareas',
          'Implementa agregar tarea (input + botón), marcar como completada (checkbox) y eliminar (botón x)',
          'Agrega un contador que muestre "X de Y tareas completadas"',
          'Filtra la lista para mostrar: todas / pendientes / completadas',
          'Extrae los componentes en archivos separados: TodoList, TodoItem, TodoFilter',
        ],
        tip: 'Cuando el estado se vuelve complejo (múltiples valores relacionados), considera useReducer. Para este ejercicio useState está perfecto — no sobre-ingenierices.',
        completed: false,
      },
      {
        id: 'w3-l2',
        title: 'Next.js App Router: rutas, layouts y Server Components',
        type: 'reading',
        content: `## Next.js App Router

Next.js con App Router es el estándar de la industria para React en producción. La convención de archivos define las rutas automáticamente.

### Estructura de carpetas

\`\`\`
app/
├── layout.tsx          → Layout raíz (siempre presente)
├── page.tsx            → Ruta: /
├── about/
│   └── page.tsx        → Ruta: /about
├── blog/
│   ├── page.tsx        → Ruta: /blog
│   └── [slug]/
│       └── page.tsx    → Ruta: /blog/:slug (dinámica)
└── api/
    └── contact/
        └── route.ts    → Ruta API: /api/contact
\`\`\`

### layout.tsx — el contenedor persistente

\`\`\`tsx
// app/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mi sitio',
  description: 'Descripción para SEO',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <nav>Mi navbar</nav>
        {children}  {/* Aquí se renderiza la página activa */}
        <footer>Mi footer</footer>
      </body>
    </html>
  );
}
\`\`\`

### Server Components vs Client Components

**Por default, todos los componentes en App Router son Server Components.**

\`\`\`tsx
// Server Component (sin 'use client')
// ✅ Puede hacer fetch directamente
// ✅ Accede a datos del servidor (DB, variables de entorno)
// ❌ No puede usar useState, useEffect, event handlers
const Pagina = async () => {
  const posts = await fetch('https://api.ejemplo.com/posts').then(r => r.json());

  return (
    <ul>
      {posts.map(post => <li key={post.id}>{post.title}</li>)}
    </ul>
  );
};

// Client Component
'use client'; // Necesario cuando usas hooks o eventos

import { useState } from 'react';

const Boton = () => {
  const [clicked, setClicked] = useState(false);

  return (
    <button onClick={() => setClicked(true)}>
      {clicked ? 'Clickeado!' : 'Click me'}
    </button>
  );
};
\`\`\`

### Rutas dinámicas y params

\`\`\`tsx
// app/blog/[slug]/page.tsx
interface Props {
  params: { slug: string };
}

const BlogPost = async ({ params }: Props) => {
  const post = await fetchPost(params.slug);

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
};

export default BlogPost;
\`\`\`

### API Routes

\`\`\`typescript
// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, mensaje } = body;

  // Validar, guardar en DB, enviar email...

  return NextResponse.json({ success: true });
}
\`\`\``,
        completed: false,
      },
      {
        id: 'w3-l2b',
        title: 'Mini-práctica: Portfolio con Next.js App Router',
        type: 'practice',
        tasks: [
          'Crea un proyecto Next.js nuevo con create-next-app (TypeScript + Tailwind + App Router)',
          'Implementa layout.tsx con navbar y footer que persistan en todas las páginas',
          'Crea app/page.tsx (home) con hero section y lista de proyectos hardcodeada',
          'Crea app/proyectos/[id]/page.tsx para el detalle de cada proyecto',
          'Agrega metadata (title, description) a cada página — verifica en el <title> del HTML',
          'Despliega en Vercel con "vercel" CLI o conectando el repo en vercel.com',
        ],
        tip: 'Cuando veas que un componente necesita estado o eventos, conviértelo en Client Component con "use client". Mantén Server Components para todo lo que pueda ser estático o necesite datos del servidor.',
        completed: false,
      },
      {
        id: 'w3-l3',
        title: 'TypeScript en React: tipos, interfaces y generics',
        type: 'reading',
        content: `## TypeScript en React

TypeScript añade tipos estáticos a JavaScript, catching errores en desarrollo antes de que lleguen a producción. En Next.js es el estándar — aprenderlo bien te ahorra horas de debugging.

### Tipos básicos

\`\`\`typescript
// Primitivos
const nombre: string = 'Gabriel';
const edad: number = 28;
const activo: boolean = true;

// Arrays
const tecnologias: string[] = ['React', 'Next.js', 'TypeScript'];
const precios: number[] = [100, 200, 300];

// Funciones
const saludar = (nombre: string): string => {
  return \`Hola, \${nombre}\`;
};

// Void — función que no retorna valor
const log = (mensaje: string): void => {
  console.log(mensaje);
};
\`\`\`

### Interfaces y Types

\`\`\`typescript
// Interface — para describir la forma de un objeto
interface Proyecto {
  id: number;
  titulo: string;
  descripcion: string;
  tecnologias: string[];
  url?: string; // opcional
  destacado: boolean;
}

// Type — más versátil, puede ser unión, intersección, etc.
type Estado = 'activo' | 'inactivo' | 'pendiente';
type ID = string | number;

// Combinar tipos
type ProyectoConEstado = Proyecto & {
  estado: Estado;
  fechaCreacion: Date;
};
\`\`\`

### TypeScript en componentes React

\`\`\`tsx
// Props con interface
interface CardProps {
  proyecto: Proyecto;
  onSeleccionar: (id: number) => void;
  className?: string;
}

const Card = ({ proyecto, onSeleccionar, className }: CardProps) => {
  return (
    <div
      className={className}
      onClick={() => onSeleccionar(proyecto.id)}
    >
      <h3>{proyecto.titulo}</h3>
    </div>
  );
};

// useState con tipo explícito
const [proyectoSeleccionado, setProyectoSeleccionado] = useState<Proyecto | null>(null);
const [tecnologias, setTecnologias] = useState<string[]>([]);

// Eventos
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value);
};
\`\`\`

### Generics — tipos reutilizables

\`\`\`typescript
// Una función que funciona con cualquier tipo
const primero = <T>(array: T[]): T | undefined => {
  return array[0];
};

const primerNombre = primero(['Gabriel', 'Ana', 'Luis']); // tipo: string
const primerNumero = primero([1, 2, 3]); // tipo: number

// Hook genérico para fetch
const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  // ...
  return { data, loading };
};

const { data: usuarios } = useFetch<Usuario[]>('/api/users');
\`\`\``,
        completed: false,
      },
      {
        id: 'w3-l3b',
        title: 'Mini-práctica: Tipea toda tu app de portfolio',
        type: 'practice',
        tasks: [
          'Define interfaces TypeScript para todos los datos de tu app (Proyecto, Habilidad, etc.)',
          'Elimina todos los any del código — usa unknown + narrowing donde sea necesario',
          'Tipa todos los props de componentes con interfaces explícitas',
          'Tipa todos los event handlers (React.MouseEvent, React.ChangeEvent, etc.)',
          'Ejecuta npx tsc --noEmit — debe pasar sin errores antes de continuar',
        ],
        tip: 'Si TypeScript te da un error que no entiendes, pégalo en Claude con el contexto del código. Generalmente hay una solución simple que el error no comunica bien.',
        completed: false,
      },
          {
        id: 'web-3-proj-basico',
        title: 'Proyecto Básico: API REST con 3 endpoints',
        type: 'project',
        difficulty: 'básico',
        projectBrief: 'Construye una API REST mínima con 3 endpoints usando las API Routes de Next.js.',
        deliverables: [
          'Mínimo 3 API routes: GET (listar), POST (crear), GET by ID',
          'Validación de entrada con Zod en el endpoint POST',
          'Respuestas de error correctas: 400, 404 y 500 con mensajes útiles',
          'Prueba de cada endpoint en Thunder Client o Postman (screenshots)',
        ],
        tip: 'Una API que devuelve errores genéricos es imposible de debuggear. Los mensajes de error deben ser útiles para quien los consume.',
        completed: false,
      },
],
    resources: [
      {
        title: 'Next.js Docs — App Router',
        url: 'https://nextjs.org/docs/app',
        type: 'documentation',
      },
      {
        title: 'React Docs — Learn React',
        url: 'https://react.dev/learn',
        type: 'documentation',
      },
      {
        title: 'TypeScript — The Basics',
        url: 'https://www.typescriptlang.org/docs/handbook/2/basic-types.html',
        type: 'documentation',
      },
    ],
  },
  {
    id: 'web-4',
    number: 16,
    title: 'Backend con Supabase y Deploy en Vercel',
    description: 'Conecta tu app a una base de datos real con Supabase, implementa autenticación y despliega en producción en Vercel.',
    duration: '4 semanas',
    status: 'available',
    track: 'web',
    lessons: [
      {
        id: 'w4-l1',
        title: 'Supabase: base de datos, Auth y Storage en minutos',
        type: 'reading',
        content: `## Supabase: el backend para founders

Supabase es una alternativa open-source a Firebase. Te da Postgres, autenticación, storage de archivos y API en tiempo real — todo listo para usar sin configurar servidores.

### Por qué Supabase

- **Postgres real**: no un NoSQL simplificado — queries complejas, joins, índices
- **Auth incluida**: email/password, magic links, OAuth (Google, GitHub) sin configurar nada
- **API automática**: genera una REST API y cliente TypeScript de tu esquema de DB
- **Dashboard visual**: crea tablas, ve datos, ejecuta SQL en el browser
- **Free tier generoso**: 500MB de DB, 1GB storage, 50,000 MAU

### Setup inicial

\`\`\`bash
# Instalar cliente Supabase
npm install @supabase/supabase-js

# Variables de entorno en .env.local
NEXT_PUBLIC_SUPABASE_URL=https://tuproyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
\`\`\`

\`\`\`typescript
// lib/supabase.ts — cliente singleton
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);
\`\`\`

### CRUD básico

\`\`\`typescript
// SELECT — obtener datos
const { data: proyectos, error } = await supabase
  .from('proyectos')
  .select('*')
  .order('created_at', { ascending: false });

// SELECT con filtros
const { data: destacados } = await supabase
  .from('proyectos')
  .select('id, titulo, url')
  .eq('destacado', true)
  .limit(6);

// INSERT
const { data, error } = await supabase
  .from('proyectos')
  .insert({
    titulo: 'Mi proyecto',
    descripcion: 'Descripción...',
    destacado: false,
  })
  .select()
  .single();

// UPDATE
const { error } = await supabase
  .from('proyectos')
  .update({ destacado: true })
  .eq('id', proyectoId);

// DELETE
const { error } = await supabase
  .from('proyectos')
  .delete()
  .eq('id', proyectoId);
\`\`\`

### Autenticación

\`\`\`typescript
// Registro
const { data, error } = await supabase.auth.signUp({
  email: 'usuario@email.com',
  password: 'contraseña-segura',
});

// Login
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'usuario@email.com',
  password: 'contraseña-segura',
});

// Sesión actual
const { data: { user } } = await supabase.auth.getUser();

// Logout
await supabase.auth.signOut();

// OAuth con Google
const { error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
});
\`\`\`

### Row Level Security (RLS)

RLS es el sistema de permisos de Supabase. Cada fila en la DB puede tener reglas de quién puede leerla/modificarla.

\`\`\`sql
-- Solo el dueño puede ver sus proyectos
CREATE POLICY "Usuarios ven sus proyectos"
ON proyectos FOR SELECT
USING (auth.uid() = user_id);

-- Solo el dueño puede insertar
CREATE POLICY "Usuarios insertan sus proyectos"
ON proyectos FOR INSERT
WITH CHECK (auth.uid() = user_id);
\`\`\``,
        completed: false,
      },
      {
        id: 'w4-l1b',
        title: 'Mini-práctica: Conecta tu portfolio a Supabase',
        type: 'practice',
        tasks: [
          'Crea un proyecto en supabase.com y una tabla "proyectos" con: id, titulo, descripcion, tecnologias (text[]), url, destacado, created_at',
          'Instala @supabase/supabase-js y crea el cliente en lib/supabase.ts',
          'Reemplaza los datos hardcodeados de tu portfolio por un fetch a Supabase en el Server Component',
          'Habilita RLS en la tabla y crea una política SELECT pública (para que cualquiera pueda leer)',
          'Agrega 3-5 proyectos reales desde el Dashboard de Supabase y verifica que aparecen en tu app',
        ],
        tip: 'Nunca uses la service_role key en el frontend — solo la anon key. La service_role bypasea RLS y daría acceso total a tu base de datos a cualquiera que inspeccione el código.',
        completed: false,
      },
      {
        id: 'w4-l2',
        title: 'Deploy en Vercel: de localhost a producción',
        type: 'reading',
        content: `## Deploy en Vercel

Vercel es la plataforma de deployment para Next.js — creada por el mismo equipo. Deploy en segundos, CDN global, previews automáticos por branch.

### Vercel CLI

\`\`\`bash
# Instalar globalmente
npm install -g vercel

# Login
vercel login

# Deploy desde tu carpeta del proyecto
vercel

# Deploy a producción
vercel --prod
\`\`\`

### Variables de entorno en Vercel

Las variables de .env.local NO se suben a git. Debes configurarlas en Vercel:

\`\`\`bash
# Via CLI
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY

# O desde el dashboard: vercel.com → Project → Settings → Environment Variables
\`\`\`

### Conectar repositorio de GitHub

1. Ir a vercel.com → "Add New Project"
2. Conectar tu GitHub y seleccionar el repositorio
3. Configurar variables de entorno
4. Click "Deploy"

Ahora **cada push a main despliega automáticamente**. Cada PR crea un preview URL.

### vercel.json — configuración avanzada

\`\`\`json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "no-store" }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/old-path",
      "destination": "/new-path",
      "permanent": true
    }
  ]
}
\`\`\`

### Optimización antes de deploy

\`\`\`bash
# Build local para detectar errores antes de subir
npm run build

# Check:
# ✅ Sin errores de TypeScript
# ✅ Sin errores de build
# ✅ Bundle sizes razonables (Vercel los muestra)
# ✅ Variables de entorno configuradas en Vercel
\`\`\`

### Dominios custom

\`\`\`bash
# Agregar dominio desde CLI
vercel domains add midominio.com

# O desde el dashboard: Project → Settings → Domains
\`\`\`

Vercel maneja certificados SSL automáticamente. Tu sitio tiene HTTPS desde el primer deploy.

### Analytics y Web Vitals

En Vercel Pro (o con @vercel/analytics en el free tier):

\`\`\`tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function Layout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
\`\`\``,
        completed: false,
      },
      {
        id: 'w4-l2b',
        title: 'Mini-práctica: Tu portfolio en producción',
        type: 'practice',
        tasks: [
          'Ejecuta npm run build localmente — debe pasar sin errores antes de continuar',
          'Configura las variables de entorno de Supabase en vercel.com (no en el CLI)',
          'Conecta tu repositorio de GitHub a Vercel y despliega',
          'Verifica que los proyectos de Supabase cargan correctamente en la URL de producción',
          'Agrega @vercel/analytics al proyecto y verifica que aparece en el dashboard de Vercel',
          'Prueba el sitio en mobile desde tu celular real — no solo DevTools',
        ],
        tip: 'Si el build funciona en local pero falla en Vercel, el problema casi siempre son las variables de entorno. Verifica que están configuradas para el entorno correcto (Production, Preview, Development).',
        completed: false,
      },

      {
        id: 'web-exam',
        title: 'Examen final: Desarrollo Web',
        type: 'exam',
        questions: [
          {
            q: '¿Cuál es la diferencia entre un Server Component y un Client Component en Next.js App Router?',
            options: [
              'Los Server Components son más lentos porque se renderizan en el servidor',
              'Los Server Components se renderizan en el servidor (sin JS en el cliente, pueden acceder a datos directamente); los Client Components se renderizan en el browser y pueden usar useState/eventos',
              'Los Client Components son los que usan TypeScript; los Server Components usan JavaScript puro',
              'No hay diferencia real, es solo una convención de nombres',
            ],
            correct: 1,
            explanation: 'Server Components corren en el servidor: acceden a DB/APIs directamente, no envían JS al cliente, no pueden usar hooks ni event handlers. Client Components (marcados con "use client") corren en el browser: pueden usar useState, useEffect, onClick, etc. Por defecto en App Router, todos son Server Components.',
          },
          {
            q: '¿Qué hace el hook useState en React y cuándo se vuelve a renderizar el componente?',
            options: [
              'useState guarda datos en localStorage; el componente se re-renderiza al recargar la página',
              'useState guarda estado local del componente; el componente se re-renderiza cada vez que el estado cambia',
              'useState conecta el componente a la base de datos; se re-renderiza cuando cambian los datos externos',
              'useState es para variables globales; se re-renderiza cuando cualquier componente de la app cambia',
            ],
            correct: 1,
            explanation: 'useState retorna [valor, setter]. Cuando llamas al setter, React re-renderiza el componente con el nuevo valor. El estado es local al componente — no se comparte automáticamente con otros componentes. Para estado global, necesitas Context API, Zustand u otra solución.',
          },
          {
            q: '¿Qué hace el operador spread (...) en este código: const nuevo = { ...usuario, rol: "admin" }?',
            options: [
              'Elimina todas las propiedades de usuario y solo deja rol: "admin"',
              'Crea un nuevo objeto con todas las propiedades de usuario, y agrega/sobreescribe rol con "admin"',
              'Combina usuario con otro objeto llamado admin',
              'Genera un error porque no se puede usar spread con objetos',
            ],
            correct: 1,
            explanation: 'El spread operator (...) copia todas las propiedades enumerables del objeto original al nuevo objeto. Si ya existe la propiedad, se sobreescribe con el valor nuevo. Es el patrón estándar para crear copias inmutables de objetos con modificaciones en React y TypeScript.',
          },
          {
            q: '¿Cuál es la diferencia entre async/await y .then()/.catch() en JavaScript?',
            options: [
              'async/await es más rápido en ejecución porque no usa Promises',
              'async/await es sintaxis más legible que produce el mismo comportamiento asíncrono que .then()/.catch()',
              '.then() es moderno; async/await es la versión legacy',
              'async/await solo funciona en Node.js; .then() funciona en el browser',
            ],
            correct: 1,
            explanation: 'async/await es "syntactic sugar" sobre Promises — internamente hace lo mismo que .then()/.catch() pero con código que se lee de forma secuencial (más fácil de entender y debuggear). Ambos son válidos; async/await es el estándar moderno preferido.',
          },
          {
            q: '¿Qué significa TypeScript strict mode y cuál es su beneficio principal?',
            options: [
              'Hace que el código TypeScript sea más estricto en el formato (indentación, comillas)',
              'Activa verificaciones adicionales como strictNullChecks y noImplicitAny, detectando más errores en tiempo de compilación',
              'Impide usar JavaScript puro dentro de archivos TypeScript',
              'Hace que el build sea más lento para garantizar mayor calidad',
            ],
            correct: 1,
            explanation: 'strict mode activa varias flags: strictNullChecks (null/undefined no son asignables a otros tipos), noImplicitAny (no puedes dejar variables sin tipo implícito), strictFunctionTypes, y más. El beneficio: errores que antes llegarían a producción se detectan en desarrollo.',
          },
          {
            q: '¿Cuándo deberías usar CSS Grid en lugar de Flexbox?',
            options: [
              'Grid para layouts de una dimensión (fila O columna); Flexbox para dos dimensiones',
              'Flexbox para layouts de una dimensión; Grid para layouts de dos dimensiones (filas Y columnas)',
              'Grid es obsoleto — siempre usa Flexbox',
              'Flexbox es para mobile; Grid es solo para desktop',
            ],
            correct: 1,
            explanation: 'Flexbox es ideal para layouts en una dirección (nav, cards en fila, centrar un elemento). Grid brilla en layouts bidimensionales (el layout completo de la página, galería de fotos, dashboard). En la práctica se complementan: Grid para la macro-estructura, Flexbox para componentes internos.',
          },
          {
            q: '¿Qué hace este código de Supabase: .eq("destacado", true).limit(6)?',
            options: [
              'Elimina 6 registros donde destacado sea true',
              'Selecciona todos los registros y filtra los primeros 6 en el frontend',
              'Filtra filas donde destacado = true en la base de datos y retorna máximo 6 resultados',
              'Actualiza 6 registros para que destacado sea true',
            ],
            correct: 2,
            explanation: '.eq() aplica un filtro WHERE en la query SQL (WHERE destacado = true). .limit(6) limita el resultado a 6 filas. Todo esto se ejecuta en el servidor de Supabase/Postgres — no en el cliente. Es equivalente a: SELECT * FROM tabla WHERE destacado = true LIMIT 6.',
          },
          {
            q: '¿Qué problema resuelve box-sizing: border-box y por qué es el estándar actual?',
            options: [
              'Hace que todos los elementos tengan el mismo tamaño sin importar su contenido',
              'Incluye padding y border en el width declarado, evitando que los elementos se hagan más grandes de lo esperado',
              'Elimina los márgenes entre elementos para un layout más limpio',
              'Hace que el box model use unidades relativas (rem) en lugar de píxeles',
            ],
            correct: 1,
            explanation: 'Sin border-box, un div de width:300px con padding:20px termina midiendo 340px (300 + 20×2). Con border-box, el padding se incluye dentro del width declarado: el div sigue midiendo 300px. Es el comportamiento más intuitivo y se aplica universalmente con *, *::before, *::after { box-sizing: border-box }.',
          },
        ],
        completed: false,
      },
    
    {
      id: 'web-4-p1',
      title: 'Proyecto: App full-stack con autenticación',
      type: 'project',
      difficulty: 'profesional',
      projectBrief: 'Construye una aplicación web full-stack con Next.js + Supabase que incluya autenticación, CRUD completo de recursos, y deploy en producción. Elige el dominio: gestor de tareas, blog, o directorio de recursos.',
      deliverables: [
        'Repositorio público en GitHub',
        'URL en producción (Vercel u otro)',
        'Autenticación funcional (email o OAuth)',
        'CRUD completo con validación',
        'README con instrucciones de setup',
      ],
      rubrica: [
        'Autenticación segura, sin exponer claves',
        'UI responsive y funcional',
        'Código organizado por componentes/módulos',
        'Deploy estable en producción',
      ],
      completed: false,
    },],
    resources: [
      {
        title: 'Supabase Docs — Getting Started',
        url: 'https://supabase.com/docs/guides/getting-started',
        type: 'documentation',
      },
      {
        title: 'Vercel Docs — Deploying Next.js',
        url: 'https://vercel.com/docs/frameworks/nextjs',
        type: 'documentation',
      },
      {
        title: 'Supabase + Next.js — Tutorial oficial',
        url: 'https://supabase.com/docs/guides/getting-started/quickstarts/nextjs',
        type: 'course',
      },
    ],
  },
  {
    id: 'web-capstone',
    number: 39,
    title: 'Proyecto Final: SaaS MVP en Producción',
    description: 'Construye y despliega una aplicación full-stack real con Next.js, Supabase y TypeScript. De la idea al producto en producción.',
    duration: '6 semanas',
    status: 'available',
    track: 'web',
    lessons: [
      {
        id: 'web-cap-1',
        title: 'Proyecto Capstone: Tu Primer SaaS en Producción',
        type: 'project',
      difficulty: 'profesional',
        projectBrief: `## De cero a producción: el proyecto que valida todo

Este capstone es la diferencia entre saber programar y ser un developer. Un proyecto en producción con usuarios reales vale más en tu portafolio que 100 tutoriales completados.

### El brief

Construye y despliega una aplicación web funcional con las tecnologías del track. Debe resolver un problema real (aunque pequeño).

### Criterios del proyecto

- **Funcional**: no un tutorial copiado — debe tener lógica propia
- **En producción**: URL pública en Vercel, accesible para cualquiera
- **Con datos reales**: Supabase como base de datos, no JSON hardcodeado
- **Con autenticación**: al menos email/password con Supabase Auth
- **Responsive**: funciona en mobile y desktop

### Ideas de proyectos (elige una o propón la tuya)

- **Task manager con equipos**: tareas, asignación a usuarios, estados, due dates
- **Link shortener con analytics**: crear links cortos, ver cuántos clicks recibió cada uno
- **Portfolio CMS**: panel donde puedes agregar/editar/eliminar proyectos que se muestran en una landing
- **Expense tracker**: registrar gastos por categoría, ver gráficas de resumen
- **Waitlist para tu idea de startup**: landing page + formulario + panel admin para ver los registros

### Stack requerido

Next.js 16+ App Router · TypeScript strict · Tailwind CSS · Supabase (Postgres + Auth) · Deployed en Vercel`,
        deliverables: [
          'Repositorio público en GitHub con código limpio (no commits de "fix" encadenados — squash o rebase si es necesario), README profesional con screenshots y link a producción',
          'URL en producción en Vercel funcional — cualquier persona puede registrarse y usarla',
          'Al menos 3 features implementadas: autenticación, CRUD de la entidad principal, y una feature diferenciadora',
          'TypeScript strict sin ningún "any" — npx tsc --noEmit debe pasar limpio',
          'Responsive design verificado en mobile (375px) y desktop',
          'Video demo de 3-5 minutos mostrando el flujo completo de usuario (loom.com o similar)',
          'Documento de arquitectura (Notion o README): diagrama del schema de la DB, decisiones técnicas tomadas y por qué',
        ],
        tip: 'El error más costoso en este capstone: elegir un proyecto demasiado ambicioso y nunca terminarlo. Un task manager simple y completamente funcional en producción vale infinitamente más que un "Netflix clone" sin terminar. Scope pequeño, calidad alta, enviado.',
        completed: false,
      },
      {
        id: 'web-cap-2',
        title: 'Checklist de entrega y criterios de evaluación',
        type: 'practice',
        tasks: [
          'Código: ¿npx tsc --noEmit pasa sin errores? ¿npm run build completa sin warnings?',
          'Código: ¿hay algún console.log de debugging en el código final? (debe estar limpio)',
          'Código: ¿los nombres de variables y funciones son descriptivos y en inglés?',
          'Auth: ¿el registro, login y logout funcionan correctamente? ¿las rutas protegidas redirigen si no hay sesión?',
          'DB: ¿Row Level Security está activado en Supabase? ¿los usuarios solo pueden ver/modificar sus propios datos?',
          'UI: ¿la app muestra estados de loading mientras carga datos? ¿muestra mensajes de error útiles si algo falla?',
          'Responsive: ¿funciona en iPhone SE (375px)? ¿los elementos no se salen de la pantalla?',
          'README: ¿incluye: descripción, screenshots, stack usado, instrucciones de setup local y link a producción?',
        ],
        tip: 'Antes de considerar el proyecto terminado, pídele a alguien que no lo conoce que lo use sin instrucciones. Si se pierden, confunden, o encuentran un bug, eso es trabajo que falta. Una app que "funciona cuando tú la usas" no es lo mismo que una app que funciona.',
        completed: false,
      },
    ],
    resources: [
      {
        title: 'Supabase — Postgres + Auth + Storage',
        url: 'https://supabase.com',
        type: 'tool',
      },
      {
        title: 'Vercel — Deploy y hosting',
        url: 'https://vercel.com',
        type: 'tool',
      },
      {
        title: 'Loom — Grabar video demos',
        url: 'https://loom.com',
        type: 'tool',
      },
    ],
  },
  {
    id: 'prodai-1',
    number: 57,
    title: 'ChatGPT, Claude y Gemini como herramientas de trabajo',
    description: 'Deja de usar la IA para tareas triviales. Aprende a integrarla en flujos de trabajo reales que multiplican tu productividad como agencia.',
    duration: '2 semanas',
    status: 'available',
    track: 'prodai',
    lessons: [
      {
        id: 'prodai-1-1',
        title: 'Prompts avanzados: la diferencia entre una respuesta mediocre y una excelente',
        type: 'practice',
        content: '## Por qué el prompt importa más que el modelo\n\nLa mayoría de las personas usa ChatGPT como si fuera Google: escribe una pregunta corta y espera una respuesta genérica. Los profesionales que sacan 10x más valor de la IA construyen prompts con contexto, rol, formato y restricciones.\n\n## La anatomía de un prompt profesional\n\n**1. Rol**: "Actúa como un copywriter especializado en SaaS B2B con 10 años de experiencia"\n\n**2. Contexto**: "Estoy trabajando con un cliente que ofrece software de gestión de inventario para restaurantes en México"\n\n**3. Tarea específica**: "Escribe el headline y subheadline para su landing page principal"\n\n**4. Audiencia**: "El target es dueño de restaurante, 35-55 años, sin formación técnica, frustrado con el control manual de inventario"\n\n**5. Restricciones**: "Máximo 8 palabras en el headline, 15 en el subheadline. Sin jerga técnica. Enfoque en el resultado (ahorro de tiempo), no en la tecnología"\n\n**6. Formato de salida**: "Dame 5 opciones en formato: Headline | Subheadline"\n\n## Los 5 usos de IA que más tiempo ahorran en una agencia\n\n**Primer borrador de copy**: brief → prompt → 5 opciones → elige y refina. Lo que antes tomaba 2 horas, ahora es 20 minutos.\n\n**Investigación de audiencia**: "¿Cuáles son las 10 objeciones más comunes de [tipo de cliente] cuando considera [tipo de servicio]?"\n\n**Revisión y feedback**: "Revisa este email de ventas como si fueras el CMO de una startup que recibe 50 propuestas por semana. ¿Qué te haría responder y qué te haría ignorarlo?"\n\n**Generación de ideas**: "Dame 20 ideas de contenido para una agencia de diseño en Instagram. La audiencia son founders de startups en LATAM"\n\n**Traducción de técnico a cliente**: "Traduce esta descripción técnica de un sistema de automatización a lenguaje que entienda un dueño de negocio sin background técnico"',
        tasks: [
          'Toma un prompt simple que usas normalmente ("escríbeme un caption de Instagram sobre X") y reescríbelo con los 6 elementos de la anatomía del prompt profesional. Compara la calidad de las dos respuestas',
          'Construye una biblioteca personal de prompts: 5 prompts que uses regularmente en tu trabajo, optimizados con la estructura completa',
          'Usa la IA para investigar la audiencia de un cliente: pídele las 10 objeciones más comunes y 10 preguntas frecuentes del cliente ideal. Evalúa qué tan preciso es el resultado',
        ],
        tip: 'Guarda los prompts que funcionan en un documento de Notion o Google Docs. Una biblioteca de prompts bien construida es un activo de la agencia — no empieces desde cero cada vez.',
        completed: false,
      },
      {
        id: 'prodai-1-2',
        title: 'Flujos de trabajo con IA: casos de uso reales para agencias',
        type: 'reading',
        content: '## El error: usar IA como asistente. El acierto: usarla como sistema\n\nLa diferencia entre alguien que "usa ChatGPT a veces" y una agencia que multiplica su output con IA está en si la IA está integrada en el flujo de trabajo como parte del sistema, no como herramienta de emergencia.\n\n## Flujos de trabajo con IA para los servicios de una agencia\n\n**Propuestas de servicios**:\n1. Cliente llena briefing\n2. Claude/ChatGPT analiza el briefing y genera: resumen del problema, objetivos clave, preguntas de clarificación, estructura de propuesta sugerida\n3. Humano refina y personaliza\n4. Claude redacta el primer borrador de la propuesta\n5. Humano edita y envía\nTiempo ahorrado: 60-70% del tiempo de redacción\n\n**Brief de diseño → conceptos de marca**:\n1. Cliente brief\n2. Claude genera: 3 conceptos de posicionamiento, keywords de personalidad de marca, paletas de color sugeridas por concepto, referencias de estilos\n3. Diseñador usa esto como punto de partida, no punto de llegada\n\n**SEO content en escala**:\n1. Keyword research → lista de artículos a escribir\n2. Para cada artículo: Claude genera outline detallado con H2s, H3s y puntos clave de cada sección\n3. Escritor expande el outline con experiencia real y voz de marca\n4. Claude revisa SEO: densidad de keywords, estructura, meta description\n\n**Reporting de clientes**:\n1. Exporta los datos de las plataformas (Meta Ads, Google Analytics, etc.)\n2. Pega los datos en Claude con el prompt: "Analiza estos resultados como si fueras el account manager. Identifica 3 insights principales, 2 áreas de mejora y 3 recomendaciones para el próximo mes"\n3. Refina y personaliza el análisis con contexto del cliente',
        tasks: [
          'Elige 1 de los 4 flujos de trabajo y documenta cómo lo implementarías para un cliente actual o ficticio: paso a paso, con los prompts específicos que usarías en cada etapa',
          'Ejecuta el flujo completo una vez: toma un proyecto real o simulado y pásalo por el proceso. Documenta cuánto tiempo tardaste vs. tu estimado sin IA',
          'Identifica 3 tareas en tu trabajo semanal que podrían automatizarse parcialmente con IA. Para cada una, escribe el prompt que usarías',
        ],
        tip: 'La IA no reemplaza el juicio — acelera la ejecución. Los mejores resultados llegan cuando usas IA para generar el primer borrador (rápido y amplio) y tu criterio profesional para editar y refinar (lento y preciso).',
        completed: false,
      },
      {
        id: 'prodai-1-3',
        title: 'Notion AI, Perplexity y herramientas de IA especializadas',
        type: 'reading',
        content: '## Más allá de ChatGPT: el ecosistema de IA de una agencia\n\n**Claude (Anthropic)**: el mejor para texto largo, análisis de documentos y razonamiento complejo. Puedes pegarle un contrato completo y pedirle que identifique riesgos. O un brief de 20 páginas y pedirle un resumen ejecutivo. Su ventana de contexto es mucho mayor que ChatGPT.\n\n**Perplexity AI**: la alternativa a Google para investigación. A diferencia de ChatGPT, cita fuentes verificables y hace búsquedas en tiempo real. Ideal para research de mercado, tendencias del sector, y datos actualizados.\n\n**Notion AI**: si ya usas Notion, la IA integrada convierte bases de datos en resúmenes, genera documentos desde templates, y resume reuniones. El valor está en que vive donde ya tienes el trabajo.\n\n**Otter.ai / Fireflies**: transcripción automática de reuniones con resumen y action items. Conecta con Zoom y Google Meet. Después de una call con cliente, tienes en 2 minutos: transcripción completa + resumen ejecutivo + lista de acción. Lo que antes tardaba 30 minutos de notas.\n\n**Midjourney / DALL-E**: generación de imágenes para moodboards, referencias de diseño, y assets de contenido. Para briefings de diseño, generar referencias visuales en minutos en lugar de buscar en Pinterest durante horas.\n\n**Runway / Kling AI**: generación y edición de video con IA. Para agencias de video, puede extender clips, cambiar fondos, o generar b-roll de alta calidad sin cámara.\n\n## Construir el stack de IA de tu agencia\n\nNo necesitas todas las herramientas desde el día 1. El stack mínimo para una agencia en 2025:\n- ChatGPT Pro o Claude Pro: $20/mes. El núcleo de todo.\n- Perplexity Pro: $20/mes. Para research verificado.\n- Otter.ai: $10-17/mes. Para reuniones con clientes.\n- Midjourney: $10/mes. Para referencias visuales y moodboards.',
        tasks: [
          'Configura Otter.ai o Fireflies en tu cuenta de Google Meet o Zoom. En tu próxima reunión (puede ser ficticia), prueba la transcripción automática y evalúa la calidad del resumen generado',
          'Usa Perplexity para investigar el mercado de un cliente: tendencias del sector, principales competidores y oportunidades. Compara la calidad vs. una búsqueda tradicional en Google',
          'Define el stack de IA de tu agencia: cuáles herramientas usarás, para qué uso específico cada una, y cuánto cuesta mensualmente',
        ],
        tip: 'El ROI de las suscripciones de IA se mide en tiempo ahorrado. Si Claude Pro a $20/mes te ahorra 5 horas de trabajo al mes y facturas $50/hora, tu ROI es 12.5x. Haz ese cálculo para cada herramienta antes de suscribirte.',
        completed: false,
      },
          {
        id: 'prodai-1-proj-basico',
        title: 'Proyecto Básico: Optimiza 3 prompts de tu trabajo diario',
        type: 'project',
        difficulty: 'básico',
        projectBrief: 'Identifica 3 tareas que ya haces con IA y optimiza los prompts para obtener mejores resultados.',
        deliverables: [
          'Los 3 prompts originales que usabas (pueden ser simples o incompletos)',
          'Los 3 prompts optimizados con la estructura completa (rol, contexto, tarea, audiencia, restricciones, formato)',
          'Comparativa de outputs: copia el resultado del prompt original y del optimizado para cada caso',
          'Análisis: qué cambio en la estructura del prompt generó el mayor impacto en la calidad del resultado',
        ],
        tip: 'No intentes optimizar los 3 prompts a la vez. Optimiza uno, evalúa, y luego el siguiente.',
        completed: false,
      },
],
    resources: [
      { title: 'Claude — IA de Anthropic, mejor para texto y análisis largo', url: 'https://claude.ai', type: 'tool' },
      { title: 'Perplexity AI — búsqueda con IA y fuentes verificadas', url: 'https://www.perplexity.ai', type: 'tool' },
      { title: 'Otter.ai — transcripción automática de reuniones', url: 'https://otter.ai', type: 'tool' },
    ],
  },
  {
    id: 'prodai-2',
    number: 58,
    title: 'Automatización con n8n',
    description: 'Construye flujos de automatización sin código que conectan tus herramientas y eliminan trabajo manual repetitivo.',
    duration: '3 semanas',
    status: 'available',
    track: 'prodai',
    lessons: [
      {
        id: 'prodai-2-1',
        title: 'n8n: el sistema nervioso de tu agencia',
        type: 'reading',
        content: '## Por qué n8n y no Zapier\n\nn8n es la alternativa de código abierto a Zapier con ventajas clave para agencias: puede correr en tu propio servidor (sin límite de ejecuciones), tiene lógica condicional más poderosa, permite integrar código JavaScript cuando los nodos nativos no alcanzan, y tiene una interfaz visual más expresiva para flujos complejos.\n\nZapier sigue siendo válido para automatizaciones simples y equipos no técnicos. n8n es para quien quiere control total y escalar sin pagar por ejecución.\n\n## Conceptos fundamentales de n8n\n\n**Workflow**: el flujo completo de automatización. Puede tener desde 2 nodos hasta 50+.\n\n**Nodo**: cada paso del flujo. Puede ser un trigger, una acción, una transformación de datos, o lógica condicional.\n\n**Trigger**: el evento que dispara el workflow. Puede ser: tiempo (cada hora, cada lunes), webhook (cuando llega una petición HTTP), evento en una app (nuevo email, nuevo formulario, nuevo lead).\n\n**Credentials**: las conexiones autenticadas a tus apps. Configuras una vez, usas en todos los workflows.\n\n## Casos de uso de n8n para una agencia\n\n**Onboarding de clientes**: formulario de briefing → crea carpeta en Google Drive → crea proyecto en Linear/Notion → envía email de bienvenida con accesos → notifica al equipo en Slack.\n\n**Reporte automático de ads**: cada lunes a las 9am → extrae datos de Meta Ads API y Google Ads API → formatea en tablas → genera PDF → envía por email al cliente.\n\n**Gestión de leads**: formulario del sitio web → agrega a CRM → envía secuencia de nurturing en email → notifica al vendedor si el lead abre el email 3 veces.\n\n**Publicación de contenido**: aprueba post en Notion → webhook dispara n8n → publica en Instagram + LinkedIn + Twitter automáticamente.',
        tasks: [
          'Instala n8n en la nube (n8n.cloud tiene plan gratuito) o con Docker en tu máquina local. Configura las credenciales de Gmail y Google Sheets',
          'Construye tu primer workflow: cuando alguien llena un formulario de Google Forms → agrega la respuesta a una hoja de Google Sheets → envía un email de confirmación automático',
          'Identifica 3 procesos repetitivos en tu agencia o práctica actual que podrías automatizar con n8n. Para cada uno, dibuja el flujo: trigger → pasos → resultado',
        ],
        tip: 'El primer workflow de n8n siempre parece complicado. El segundo ya es fácil. Empieza con el más simple posible (formulario → email) y construye complejidad gradualmente.',
        completed: false,
      },
      {
        id: 'prodai-2-2',
        title: 'Workflows avanzados: IA + n8n + APIs',
        type: 'practice',
        content: '## Cuando n8n se conecta con IA, la automatización se vuelve inteligente\n\nn8n tiene nodos nativos para OpenAI, Anthropic (Claude), Google Gemini y otros modelos. Esto permite flujos donde la IA no solo ejecuta pasos mecánicos — toma decisiones, clasifica, resume y genera contenido en el medio del flujo.\n\n## Workflow de agencia con IA integrada\n\n**Lead scoring automático**:\n1. Nuevo lead desde formulario de contacto\n2. n8n pasa los datos del lead a Claude con el prompt: "Basado en estos datos, califica este lead del 1-10 según fit con una agencia digital de LATAM especializada en SaaS. Justifica brevemente"\n3. Si score > 7: notifica al equipo por Slack con prioridad alta\n4. Si score 4-7: agrega a secuencia de nurturing de email\n5. Si score < 4: solo registra en CRM sin acción\n\n**Resumen automático de reuniones**:\n1. Reunión termina en Zoom\n2. Otter.ai genera transcripción automáticamente\n3. n8n recibe el webhook de Otter con la transcripción\n4. Claude recibe la transcripción y genera: resumen ejecutivo, action items con responsable, y 3 puntos clave para el cliente\n5. El resumen se guarda en Notion en la página del cliente\n6. Se envía automáticamente por email al cliente\n\n**Monitoreo de menciones con respuesta asistida**:\n1. Google Alerts detecta mención de la marca del cliente\n2. n8n recibe el alert\n3. Claude clasifica si es positivo/negativo/neutral y sugiere una respuesta apropiada\n4. Notifica al CM con el contexto y la sugerencia de respuesta para revisión humana',
        tasks: [
          'Construye el workflow de resumen de reuniones: toma un archivo de texto como simulación de transcripción → Claude lo resume → el resumen se guarda en Google Docs',
          'Agrega un paso de clasificación de leads a tu formulario de contacto: cuando llega un nuevo envío, Claude lo clasifica y envía la notificación correcta según el score',
          'Documenta el workflow más complejo que construiste con diagrama visual (export desde n8n) y descripción de cada nodo',
        ],
        tip: 'n8n tiene una función de "error workflow" — un flujo separado que se activa cuando otro falla. Configura siempre un workflow de error para flujos críticos (como el onboarding de clientes). Un fallo silencioso es peor que un fallo visible.',
        completed: false,
      },
          {
        id: 'prodai-2-proj-inter',
        title: 'Proyecto Intermedio: Workflow n8n que conecta 3 herramientas',
        type: 'project',
        difficulty: 'intermedio',
        projectBrief: 'Construye un workflow en n8n que conecte al menos 3 herramientas diferentes y resuelva un problema real de tu agencia.',
        deliverables: [
          'Descripción del problema que resuelve: qué proceso manual reemplaza',
          'Workflow funcional en n8n con mínimo 3 herramientas integradas',
          'Diagrama del flujo exportado desde n8n',
          'Video de demostración de 90 segundos mostrando el workflow activándose y completándose (Loom)',
          'Cálculo de tiempo ahorrado: cuántas veces por semana se ejecuta × tiempo manual que reemplaza',
        ],
        tip: 'El workflow más valioso no es el más sofisticado — es el que automatiza la tarea más repetitiva y aburrida que tienes.',
        completed: false,
      },

    {
      id: 'prodai-2-p2',
      title: 'Proyecto: Agente de automatización con n8n',
      type: 'project',
      difficulty: 'intermedio',
      projectBrief: 'Construye un workflow en n8n que tome una solicitud de usuario vía webhook, la procese con un modelo de IA para clasificarla y responda automáticamente con una acción diferente según la categoría.',
      deliverables: [
        'Workflow exportado en JSON',
        'Captura del workflow funcionando',
        'Video de 2 minutos mostrando el flujo end-to-end',
        'Documento explicando la lógica de clasificación',
      ],
      rubrica: [
        'Workflow funciona sin errores',
        'Clasificación correcta en al menos 3 categorías',
        'Manejo de errores implementado',
      ],
      completed: false,
    },],
    resources: [
      { title: 'n8n — plataforma de automatización open source', url: 'https://n8n.io', type: 'tool' },
      { title: 'n8n Templates — flujos preconfigurados para empezar rápido', url: 'https://n8n.io/workflows', type: 'tool' },
    ],
  },
  {
    id: 'prodai-capstone',
    number: 59,
    title: 'Proyecto: Sistema de productividad con IA para tu agencia',
    description: 'Integra IA y automatización en los flujos reales de tu práctica o agencia.',
    duration: '2 semanas',
    status: 'available',
    track: 'prodai',
    lessons: [
      {
        id: 'prodai-capstone-1',
        title: 'Proyecto: Stack de productividad completo',
        type: 'project',
      difficulty: 'profesional',
        projectBrief: 'Diseña e implementa el sistema de productividad con IA de tu agencia o práctica freelance. El objetivo es que al terminar, al menos 3 procesos repetitivos en tu trabajo estén automatizados o acelerados con IA.',
        deliverables: [
          'Stack de IA documentado: herramientas elegidas, para qué uso específico, costo mensual y ROI estimado',
          'Biblioteca de prompts: mínimo 10 prompts optimizados para los casos de uso más frecuentes de tu agencia (propuestas, copy, research, reportes)',
          'Al menos 2 workflows de n8n funcionando: documentados con diagrama + descripción de cada nodo + video de demostración de 2 minutos mostrando el flujo en acción',
          'Caso de uso documentado: un proceso real que tardaba X tiempo y ahora, con IA + automatización, tarda Y. Incluye: descripción del proceso anterior, proceso nuevo, tiempo ahorrado y calidad comparativa',
          'Guía de onboarding de IA para un colaborador nuevo: cómo usarías estas herramientas si incorporaras a alguien al equipo mañana',
        ],
        tasks: [
          'Implementa los 2 workflows en n8n y graba un video de 2 minutos demostrando que funcionan',
          'Comparte el stack documentado en #proyecto-prodai y pide feedback sobre flujos que podrías mejorar o agregar',
          'Calcula el ahorro de tiempo real de los flujos implementados: horas por semana × tu tarifa horaria = valor del sistema',
        ],
        tip: 'Un sistema de IA que funciona para ti no necesariamente funciona para tu cliente. Separa: qué usas internamente para ser más eficiente (nunca lo ve el cliente) vs. qué le entregas al cliente como parte del servicio.',
        completed: false,
      },
    ],
    resources: [],
  },
]
