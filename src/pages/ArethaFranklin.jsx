import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft } from 'lucide-react';

const ArethaFranklin = () => {
  const songs = [
    {
      title: "Respect",
      year: 1967,
      description: "Originally penned by Otis Redding, Aretha Franklin's cover of \"Respect\" became her iconic anthem. Her unique arrangement and subtle lyrical changes transformed the song into a powerful statement on human dignity and gender roles.",
      youtubeEmbed: "6FOUqQt3Kg0"
    },
    {
      title: "A Change Is Gonna Come",
      year: 1964,
      description: "This powerful song, originally by Sam Cooke, was inspired by personal experiences with racial discrimination. Franklin's rendition captures the essence of hope and struggle during the Civil Rights Movement.",
      youtubeEmbed: "amVCS5ttGcE"
    },
    {
      title: "Ain't No Way",
      year: 1968,
      description: "Written by Aretha's sister Carolyn Franklin, this poignant song showcases the incredible talent within the Franklin family. It was initially released as the B-side to \"(Sweet Sweet Baby) Since You've Been Gone.\"",
      youtubeEmbed: "PB2Mu2zBzjw"
    },
    {
      title: "Until You Come Back To Me",
      year: 1973,
      description: "Co-written by Stevie Wonder, this song became a million-selling hit for Franklin. It reached No. 1 on the R&B chart and No. 3 on the Hot 100, earning RIAA Gold record status.",
      youtubeEmbed: "bJZwcaWResA"
    },
    {
      title: "Think",
      year: 1968,
      description: "Co-written by Franklin, this empowering and high-energy song reached No. 7 on the Billboard Hot 100 and No. 1 on the Hot Rhythm & Blues Singles chart.",
      youtubeEmbed: "Vet6AHmq3_s"
    },
    {
      title: "I Dreamed A Dream",
      year: 1991,
      description: "Franklin's soulful rendition of this iconic song from \"Les Misérables\" showcases her remarkable vocal range and ability to convey raw emotions.",
      youtubeEmbed: "S4F4SbGtqL4"
    },
    {
      title: "Bridge Over Troubled Water",
      year: 1971,
      description: "Franklin's soulful interpretation of this Simon & Garfunkel classic adds unique depth and richness to the song's message of comfort and support.",
      youtubeEmbed: "5-7ublizwZ0"
    },
    {
      title: "Willing To Forgive",
      year: 1994,
      description: "This soulful ballad, written and produced by Babyface and Daryl Simmons, showcases Franklin's incredible vocal prowess and emotional depth.",
      youtubeEmbed: "2sQz29AN1gs"
    },
    {
      title: "Oh Happy Day",
      year: 1988,
      description: "Franklin's rendition of this gospel classic, performed with Mavis Staples, is a soul-stirring anthem that captures the essence of faith and gratitude.",
      youtubeEmbed: "AdCWR-XpGxI"
    },
    {
      title: "I Say A Little Prayer",
      year: 1968,
      description: "This heartfelt ballad showcases Franklin's ability to capture the essence of hope and devotion through her powerful yet tender vocals.",
      youtubeEmbed: "TDyiREoBw0o"
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
          <h1 className="text-4xl font-bold mb-4">Aretha Franklin</h1>
          <p className="text-xl mb-8">
            Aretha Franklin, the undisputed Queen of Soul, left an indelible mark on the world of music with her mesmerizing voice and powerful performances. Her astonishing career spanned over five decades, earning her the admiration and respect of fans and fellow musicians alike. With an extensive discography, it can be challenging to narrow down her greatest hits to just ten, but we have embarked on this delightful journey to celebrate the timeless brilliance of Aretha Franklin's music.
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

export default ArethaFranklin;