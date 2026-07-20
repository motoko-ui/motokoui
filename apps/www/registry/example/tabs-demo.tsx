import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/motokoui/tabs"

export function TabsDemo() {
  return (
    <Tabs defaultValue="account" className="w-full max-w-md">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="text-muted-foreground text-sm leading-relaxed">
          Manage your account details and public profile.
        </div>
      </TabsContent>
      <TabsContent value="password">
        <div className="text-muted-foreground text-sm leading-relaxed">
          Change your password and review recent sign-ins.
        </div>
      </TabsContent>
      <TabsContent value="settings">
        <div className="text-muted-foreground text-sm leading-relaxed">
          Configure notifications, theme, and privacy preferences.
        </div>
      </TabsContent>
    </Tabs>
  )
}
