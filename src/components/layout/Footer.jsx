const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-600">
            © {new Date().getFullYear()} Songticel - Müzik Hikayeleri ve Anıları
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Her şarkının bir hikayesi var.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
