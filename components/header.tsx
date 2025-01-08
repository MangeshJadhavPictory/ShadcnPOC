"use client"

import { ArrowLeft, Bell, ChevronDown, Redo2, Undo2, Plus, User, CreditCard, Rocket, LogOut } from 'lucide-react'
import Link from "next/link"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"

export function Header() {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/projects">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <span className="text-sm font-medium">Projects</span>
      </div>

      <Separator orientation="vertical" className="h-6" />

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 text-xs">
              Widescreen 16:9
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Widescreen 16:9</DropdownMenuItem>
            <DropdownMenuItem>Square 1:1</DropdownMenuItem>
            <DropdownMenuItem>Portrait 9:16</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex gap-1">
          <Button variant="ghost" size="icon">
            <Undo2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Redo2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="ml-auto flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2">
              Project Name
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Rename</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>4:03</span>
        </div>

        <Button variant="default" className="bg-purple-600 hover:bg-purple-700">
          Download
        </Button>

        <Button variant="ghost" size="icon">
          <Bell className="h-4 w-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>P</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="p-0">
              <Button variant="ghost" className="w-full justify-start gap-2 text-sm text-gray-700 hover:text-gray-900" asChild>
                <Link href="/new-team">
                  <Plus className="h-4 w-4" />
                  New team
                </Link>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-0">
              <Button variant="ghost" className="w-full justify-start gap-2 text-sm text-gray-700 hover:text-gray-900" asChild>
                <Link href="/account">
                  <User className="h-4 w-4" />
                  My account
                </Link>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-0">
              <Button variant="ghost" className="w-full justify-start gap-2 text-sm text-gray-700 hover:text-gray-900" asChild>
                <Link href="/subscription">
                  <CreditCard className="h-4 w-4" />
                  My subscription
                </Link>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-0">
              <Button variant="ghost" className="w-full justify-start gap-2 text-sm text-gray-700 hover:text-gray-900" asChild>
                <Link href="/affiliate">
                  <Rocket className="h-4 w-4" />
                  Become affiliate
                </Link>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-0">
              <Button variant="ghost" className="w-full justify-start gap-2 text-sm text-gray-700 hover:text-gray-900" asChild>
                <Link href="/logout">
                  <LogOut className="h-4 w-4" />
                  Log out
                </Link>
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

