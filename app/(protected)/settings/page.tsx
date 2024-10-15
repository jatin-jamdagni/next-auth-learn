import { auth, signOut } from "@/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
import { LogOut, Settings as SettingsIcon } from "lucide-react";

const Settings = async () => {
  const session = await auth();

  if (!session || !session.user) {
    return (
      <Card className="w-full max-w-md mx-auto mt-8">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>
            You need to be logged in to view your settings.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const { user } = session;

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">User Settings</CardTitle>
          <Button variant="outline" size="icon">
            <SettingsIcon className="h-4 w-4" />
            <span className="sr-only">Edit settings</span>
          </Button>
        </div>
        <CardDescription>
          Manage your account settings and preferences.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
          <Avatar className="w-24 h-24">
            <AvatarImage
              src={user.image || ""}
              alt={user.name || "User avatar"}
            />
            <AvatarFallback>
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-semibold">{user.name}</h2>
            <p className="text-muted-foreground">{user.email}</p>
            {/* {user.role && <Badge className="mt-2">{user.role}</Badge>} */}
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Account Information</h3>
            <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  User ID
                </dt>
                <dd className="mt-1 text-sm">{user.id}</dd>
              </div>
              {/* <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Email Verified
                </dt>
                <dd className="mt-1 text-sm">
                  {user.emailVerified ? "Yes" : "No"}
                </dd>
              </div> */}
              {/* {user.createdAt && (
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Account Created
                  </dt>
                  <dd className="mt-1 text-sm">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </dd>
                </div>
              )} */}
              {/* {user.updatedAt && (
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Last Updated
                  </dt>
                  <dd className="mt-1 text-sm">
                    {new Date(user.updatedAt).toLocaleDateString()}
                  </dd>
                </div>
              )} */}
            </dl>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Session Information</h3>
            <pre className="bg-muted p-4 rounded-md overflow-x-auto">
              <code>{JSON.stringify(session, null, 2)}</code>
            </pre>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button variant="destructive" className="flex items-center">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default Settings;
