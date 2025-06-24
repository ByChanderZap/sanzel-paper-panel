import { SignUp } from "@clerk/nextjs";
import Image from "next/image";
import SanzelNoBackground from "@/public/sanzel-no-background.png";

export default function Page() {
  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center p-4">
      {/* Logo at the top */}
      <div className="mb-8">
        <Image
          alt="Logo"
          src={SanzelNoBackground}
          width={120}
          height={60}
          priority
          className="h-16 w-auto"
        />
      </div>

      {/* Sign-up component */}
      <SignUp
        appearance={{
          elements: {
            // Main card container
            card: "bg-primary border-secondary/20 shadow-2xl",

            // Header styling
            headerTitle: "text-custom-white text-2xl font-semibold",
            headerSubtitle: "text-gray-300",

            // Form elements
            formButtonPrimary:
              "bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors",
            formFieldInput:
              "bg-secondary border-gray-600 text-custom-white focus:border-blue-500 focus:ring-blue-500",
            formFieldLabel: "text-gray-300",

            // Links
            footerActionLink: "text-blue-400 hover:text-blue-300",
            identityPreviewText: "text-gray-300",

            // Social buttons
            socialButtonsBlockButton:
              "border-gray-600 text-custom-white hover:bg-secondary/50 transition-colors",
            socialButtonsBlockButtonText: "text-custom-white font-medium",

            // Divider
            dividerLine: "bg-gray-600",
            dividerText: "text-gray-400",

            // Footer
            footer: "text-gray-400",
            footerActionText: "text-gray-400",
          },
        }}
      />
    </div>
  );
}
