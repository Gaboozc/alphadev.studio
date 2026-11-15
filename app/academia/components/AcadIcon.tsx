'use client'

import {
  BookOpen,
  Play,
  PencilLine,
  ListChecks,
  NotebookPen,
  FolderKanban,
  ClipboardCheck,
  CircleDashed,
  CircleDot,
  CircleCheckBig,
  CircleX,
  Lock,
  Hourglass,
  Link as LinkIcon,
  Check,
  TriangleAlert,
  Info,
  List,
  LayoutList,
  LogOut,
  X,
  type LucideIcon,
} from 'lucide-react'

const ICONS = {
  'book-open': BookOpen,
  play: Play,
  'pencil-line': PencilLine,
  'list-checks': ListChecks,
  'notebook-pen': NotebookPen,
  'folder-kanban': FolderKanban,
  'clipboard-check': ClipboardCheck,
  'circle-dashed': CircleDashed,
  'circle-dot': CircleDot,
  'circle-check-big': CircleCheckBig,
  'circle-x': CircleX,
  lock: Lock,
  hourglass: Hourglass,
  link: LinkIcon,
  check: Check,
  'triangle-alert': TriangleAlert,
  info: Info,
  list: List,
  'layout-list': LayoutList,
  'log-out': LogOut,
  x: X,
} as const

export type AcadIconName = keyof typeof ICONS

export default function AcadIcon({
  name,
  size = 20,
  className,
  'aria-hidden': ariaHidden = true,
}: {
  name: AcadIconName
  size?: 16 | 20 | 24
  className?: string
  'aria-hidden'?: boolean
}) {
  const Icon: LucideIcon = ICONS[name]
  return (
    <Icon
      size={size}
      strokeWidth={1.75}
      absoluteStrokeWidth={false}
      className={className}
      aria-hidden={ariaHidden}
    />
  )
}
