import AuthHeroPanel from "../../fearures/auth/components/AuthHeroPanel";
import RegisterForm from "../../fearures/auth/components/RegisterForm";

export default function RegisterPage() {
  return (
      <main className="flex h-screen w-full items-center justify-center overflow-hidden bg-black p-3 sm:p-4">
      <div className="flex h-full w-full max-w-7xl overflow-hidden rounded-3xl shadow-2xl">
        {/* Hero Panel — LEFT */}
        <div className="relative hidden h-full lg:flex lg:w-[55%]">
          <AuthHeroPanel className="h-full w-full" />
        </div>

        {/* Form — RIGHT */}
        <div className="flex h-full w-full items-center justify-center bg-aura-cream lg:w-[45%]">
          <RegisterForm />
        </div>
      </div>
    </main>
  );
}