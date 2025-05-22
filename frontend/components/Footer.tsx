import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border mt-auto py-8">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white font-semibold text-xs">M</span>
            </div>
            <span className="font-semibold">ManimAI</span>
          </div>
          
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm mb-4 md:mb-0">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              GitHub
            </a>
            <Link to="/chat" className="text-muted-foreground hover:text-foreground transition-colors">
              Chat
            </Link>
          </nav>
          
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ManimAI. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}