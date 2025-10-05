import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AnimatePresence } from "framer-motion";
import PageTransition from "@/components/layout/PageTransition";
import { AuthProvider } from "@/context/AuthContext";
import { RequireAdmin } from "@/components/auth/RouteGuards";
import Index from "./pages/Index";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { RequestReset, ResetWithToken } from "./pages/AuthFlows";
import Tools from "./pages/Tools";
import Pricing from "./pages/Pricing";
import JsonFormatter from "./pages/tools/JsonFormatter";
import Base64Tool from "./pages/tools/Base64Tool";
import RegexTester from "./pages/tools/RegexTester";
import UuidGenerator from "./pages/tools/UuidGenerator";
import LoremIpsum from "./pages/tools/LoremIpsum";
import TextDiff from "./pages/tools/TextDiff";
import ColorContrast from "./pages/tools/ColorContrast";
import PasswordGenerator from "./pages/tools/PasswordGenerator";
import HexRgb from "./pages/tools/HexRgb";
import EpochTime from "./pages/tools/EpochTime";
import WordCounter from "./pages/tools/WordCounter";
import TextCase from "./pages/tools/TextCase";
import RemoveWhitespace from "./pages/tools/RemoveWhitespace";
import ReverseText from "./pages/tools/ReverseText";
import JwtDecoder from "./pages/tools/JwtDecoder";

const queryClient = new QueryClient();

const RouteViews = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
        <Route path="/gallery" element={<PageTransition><Gallery /></PageTransition>} />
        <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/tools" element={<PageTransition><Tools /></PageTransition>} />
        <Route path="/pricing" element={<PageTransition><Pricing /></PageTransition>} />
        <Route path="/tools/json-formatter" element={<PageTransition><JsonFormatter /></PageTransition>} />
        <Route path="/tools/base64" element={<PageTransition><Base64Tool /></PageTransition>} />
        <Route path="/tools/regex-tester" element={<PageTransition><RegexTester /></PageTransition>} />
        <Route path="/tools/uuid-generator" element={<PageTransition><UuidGenerator /></PageTransition>} />
        <Route path="/tools/lorem-ipsum" element={<PageTransition><LoremIpsum /></PageTransition>} />
        <Route path="/tools/text-diff" element={<PageTransition><TextDiff /></PageTransition>} />
        <Route path="/tools/color-contrast" element={<PageTransition><ColorContrast /></PageTransition>} />
        <Route path="/tools/password-generator" element={<PageTransition><PasswordGenerator /></PageTransition>} />
        <Route path="/tools/hex-rgb" element={<PageTransition><HexRgb /></PageTransition>} />
        <Route path="/tools/epoch-time" element={<PageTransition><EpochTime /></PageTransition>} />
        <Route path="/tools/word-counter" element={<PageTransition><WordCounter /></PageTransition>} />
        <Route path="/tools/text-case" element={<PageTransition><TextCase /></PageTransition>} />
        <Route path="/tools/remove-whitespace" element={<PageTransition><RemoveWhitespace /></PageTransition>} />
        <Route path="/tools/reverse-text" element={<PageTransition><ReverseText /></PageTransition>} />
        <Route path="/tools/jwt-decoder" element={<PageTransition><JwtDecoder /></PageTransition>} />
        <Route path="/signin" element={<PageTransition><SignIn /></PageTransition>} />
        <Route path="/signup" element={<PageTransition><SignUp /></PageTransition>} />
        <Route path="/reset" element={<PageTransition><RequestReset /></PageTransition>} />
        <Route path="/reset/new" element={<PageTransition><ResetWithToken /></PageTransition>} />
        <Route path="/admin" element={<RequireAdmin><PageTransition><Admin /></PageTransition></RequireAdmin>} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <RouteViews />
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
