
import React from 'react';
import { FileSpreadsheet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

interface ChatSidebarProps {
  onQuickInsert: (text: string) => void;
}

const ChatSidebar = ({ onQuickInsert }: ChatSidebarProps) => {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <FileSpreadsheet className="w-6 h-6 text-primary" />
          <h1 className="text-xl font-semibold text-foreground">A/B Test Assistant</h1>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => onQuickInsert('What can you do for me?')}>
                  💡 General capabilities
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="text-xs text-muted-foreground p-2">
          A/B Test Sheet Assistant
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default ChatSidebar;
