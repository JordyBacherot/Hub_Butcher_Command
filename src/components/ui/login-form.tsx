import { cn } from "@/lib/utils.ts"
import { Button } from "@/components/ui/button.tsx"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Label } from "@/components/ui/label.tsx"
import {useState} from "react";
import {useNavigate} from "react-router";
import { signIn } from "@/services/serviceSupabase.ts";
import {useAuth} from "@/contexts/AuthProvider.tsx";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {setIsAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      await signIn(email, password);
      setIsAuth(true); // Met à jour l'état d'authentification
      navigate("/"); // redirige vers l'accueil après connexion
    } catch (error) {
      alert("Erreur de connexion : " + (error as Error).message);
    }
  }

  return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle>Se connecter à son compte</CardTitle>
            <CardDescription>
              Veuillez entrer votre adresse e-mail et votre mot de passe pour
              vous connecter à votre compte.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-3">
                  <Label>Email</Label>
                  <Input
                      id="email"
                      type="email"
                      placeholder="nom@boucherie_bacherot.fr"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Mot de passe</Label>
                  </div>
                  <Input
                      id="password"
                      type="password"
                      required
                      placeholder="My_Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
  )
}
