import LoginHeroPanel from "../../fearures/auth/components/LoginHeroPanel";
import LoginForm from "../../fearures/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex h-screen w-full items-center justify-center overflow-hidden bg-black p-3 sm:p-4">
      <div className="flex h-full w-full max-w-7xl overflow-hidden rounded-3xl shadow-2xl">
        {/* Hero Panel — LEFT */}
        <div className="relative hidden h-full lg:flex lg:w-[55%]">
          <LoginHeroPanel className="h-full w-full" />
        </div>

        {/* Form — RIGHT */}
        <div className="flex h-full w-full items-center justify-center bg-aura-cream lg:w-[45%]">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}