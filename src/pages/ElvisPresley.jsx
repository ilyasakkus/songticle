import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft } from 'lucide-react';

const ElvisPresley = () => {
  const songs = [
    {
      title: "Always on My Mind",
      year: 1972,
      description: "Closing our top 10 is this heartfelt ballad that Elvis recorded in the later years of his career. His emotional delivery and the song's message of regret and enduring love create a powerful, memorable performance that has become a classic.",
      youtubeEmbed: "EZHiTbQ9EOM"
    },
    {
      title: "In the Ghetto",
      year: 1969,
      description: "This socially conscious song marked a departure from Elvis's usual material. Its poignant lyrics about poverty and urban struggle, coupled with Elvis's sensitive vocal performance, showcase his ability to tackle serious themes in his music.",
      youtubeEmbed: "6am8V5KNJ4A"
    },
    {
      title: "Blue Suede Shoes",
      year: 1956,
      description: "Although originally recorded by Carl Perkins, Elvis's version of \"Blue Suede Shoes\" became one of his signature songs. His energetic performance and the song's rock and roll spirit encapsulate the excitement of the emerging genre.",
      youtubeEmbed: "Bm5HKlQ6nGM"
    },
    {
      title: "Heartbreak Hotel",
      year: 1956,
      description: "Elvis's first number-one hit on the Billboard charts, \"Heartbreak Hotel\" introduced his unique vocal style to a wide audience. The song's blues influences and Elvis's emotive performance set the stage for his rise to superstardom.",
      youtubeEmbed: "MzRnKQrm61w"
    },
    {
      title: "Don't Be Cruel",
      year: 1956,
      description: "This upbeat track blends elements of pop, country, and R&B, demonstrating Elvis's ability to cross genre boundaries. His playful vocal delivery and the song's catchy melody made it an instant hit and a defining song of the early rock and roll era.",
      youtubeEmbed: "arTAfHu-pvs"
    },
    {
      title: "Love Me Tender",
      year: 1956,
      description: "This soft, country-influenced ballad showcases Elvis's more sensitive side. His crooning vocals and the song's simple, heartfelt lyrics create a timeless expression of love that contrasts with his more energetic rock performances.",
      youtubeEmbed: "093GjYcDg-4"
    },
    {
      title: "Jailhouse Rock",
      year: 1957,
      description: "The title track from Elvis's third movie, \"Jailhouse Rock\" is one of his most recognizable hits. Its driving rhythm, catchy lyrics, and Elvis's dynamic performance create an irresistible rock and roll anthem.",
      youtubeEmbed: "MfrC8PAQtlg"
    },
    {
      title: "Can't Help Falling in Love",
      year: 1961,
      description: "This tender ballad demonstrates Elvis's versatility as a vocalist. Its romantic lyrics and Elvis's gentle, heartfelt delivery have made it a beloved classic, often chosen for weddings and romantic occasions.",
      youtubeEmbed: "cKl8UZVy8Es"
    },
    {
      title: "Hound Dog",
      year: 1956,
      description: "This high-energy rock and roll classic helped cement Elvis's status as a cultural icon. His electrifying performance of the song on television, with his provocative dance moves, caused a sensation and epitomized the rebellious spirit of rock and roll.",
      youtubeEmbed: "aNYWl13IWhY"
    },
    {
      title: "Suspicious Minds",
      year: 1969,
      description: "Often considered Elvis's last great single, \"Suspicious Minds\" showcases his powerful vocals and emotional delivery. The song's dynamic arrangement and themes of trust and doubt in a relationship created a timeless hit that remains popular today.",
      youtubeEmbed: "5U3OmvCExBA"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800 mb-6">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Main Page
          </Link>
          <h1 className="text-4xl font-bold mb-4">Elvis Presley</h1>
          <p className="text-xl mb-8">
            Elvis Aaron Presley, born on January 8, 1935, in Tupelo, Mississippi, is widely regarded as one of the most significant cultural icons of the 20th century. Known as the "King of Rock and Roll," Elvis revolutionized popular music and culture in the 1950s with his energetic performances, distinctive voice, and blend of genres including rock and roll, country, blues, and gospel. His charismatic stage presence and controversial (for the time) dance moves made him a global sensation and a catalyst for the cultural shifts of the rock and roll era.
          </p>
          <h2 className="text-3xl font-semibold mb-6">Top 10 Songs</h2>
          <div className="space-y-8">
            {songs.map((song, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-semibold mb-2">
                  {index + 1}. {song.title} ({song.year})
                </h3>
                <p className="text-gray-600 mb-4">{song.description}</p>
                <div className="aspect-w-16 aspect-h-9" style={{ height: '480px' }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${song.youtubeEmbed}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ElvisPresley;