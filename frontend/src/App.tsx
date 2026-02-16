import { HomePage } from "./pages/HomePage";
import './App.css'
import logo from './assets/logo.png';
function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-capitec-gray-50 via-white to-capitec-red/5">
      {/* Header */}
      <header className="bg-white border-b-4 border-capitec-red shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="rounded-lg flex items-center justify-center">
              <img src={logo} alt="Logo" className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-capitec-gray-900">
                Loan Eligibility Calculator
              </h4>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HomePage />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-capitec-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-capitec-gray-600 text-sm">
            © {new Date().getFullYear()} Loan Eligibility Calculator
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
