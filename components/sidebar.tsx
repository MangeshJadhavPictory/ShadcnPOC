"use client"

import { Clock, Image, LayoutGrid, Music2, Palette, ScrollText, Shapes, Square } from 'lucide-react'
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const navigation = [
  { name: "Story", icon: ScrollText, href: "#" },
  { name: "Visuals", icon: Image, href: "#" },
  { name: "Audio", icon: Music2, href: "#" },
  { name: "Layouts", icon: LayoutGrid, href: "#", current: true },
  { name: "Text", icon: Square, href: "#" },
  { name: "Elements", icon: Clock, href: "#" },
  { name: "Styles", icon: Palette, href: "#" },
  { name: "Brands", icon: Shapes, href: "#" },
]

export function Sidebar() {
  return (
    <div className="flex w-[72px] flex-col items-center border-r bg-background py-4">
      {navigation.map((item) => (
        <Button
          key={item.name}
          variant={item.current ? "secondary" : "ghost"}
          size="icon"
          className="mb-2 h-14 w-14 flex-col gap-1 p-0"
          asChild
        >
          <Link href={item.href}>
            <item.icon className="h-5 w-5" />
            <span className="text-[11px]">{item.name}</span>
          </Link>
        </Button>
      ))}
      <Separator className="my-4" />
    </div>
  )
}

