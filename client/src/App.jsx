import Header from './components/Header';
import Footer from './components/Footer';
import AppRoutes from './routes/AppRoutes';
import './App.css';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#121212] text-gray-200 font-mono">
        <Header />
        <main className="flex-grow px-4 md:px-12 py-6">
          <AppRoutes />
        </main>
        <Footer />
    </div>
  );
}

export default App;
