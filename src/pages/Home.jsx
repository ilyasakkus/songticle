import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Müzik Hikayeleri ve Anıları</h1>
      <p className="text-center mb-8">Belirli şarkılarla ilgili kişisel hikayelerinizi ve anılarınızı paylaşın.</p>
      
      <div className="flex justify-center mb-8">
        <Link 
          to="/add-story"
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors"
        >
          Hikaye Ekle
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder for stories */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Şarkı Adı</h2>
          <p className="text-gray-600 mb-4">Kullanıcı hikayesi burada yer alacak...</p>
          <Link 
            to="/story/1"
            className="text-blue-500 hover:text-blue-600"
          >
            Detayları Gör
          </Link>
        </div>
        {/* More stories will be mapped here */}
      </div>
    </div>
  );
};

export default Home;
