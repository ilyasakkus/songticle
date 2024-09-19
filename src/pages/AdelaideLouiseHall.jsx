import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft } from 'lucide-react';

const AdelaideLouiseHall = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800 mb-6">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Main Page
          </Link>
          <h1 className="text-4xl font-bold mb-4">Adelaide Louise Hall</h1>
          <p className="text-xl mb-8">
            Adelaide Louise Hall, born on October 20, 1901, in Brooklyn, New York, was a pioneering jazz singer and entertainer whose career spanned over eight decades. Known for her innovative scat singing and her role in shaping early jazz vocals, Hall was a trailblazer who performed with legends like Duke Ellington and Art Tatum. Her unique style, combining a rich, warm tone with adventurous vocal techniques, influenced generations of jazz and pop singers.
          </p>
          <h2 className="text-3xl font-semibold mb-6">Top 10 Songs</h2>
          <div className="space-y-8">
            {[
              {
                title: "Creole Love Call",
                year: 1927,
                description: "This groundbreaking recording features Hall's wordless vocals, creating a hauntingly beautiful melody that intertwines with Ellington's orchestra. Her innovative use of her voice as an instrument on this track is considered one of the earliest examples of scat singing in recorded jazz history.",
                youtubeEmbed: "l0mH9JPDHio"
              },
              {
                title: "I Can't Give You Anything But Love",
                year: 1932,
                description: "Hall's rendition of this Jimmy McHugh and Dorothy Fields classic showcases her warm, expressive voice and impeccable phrasing. Her interpretation brings a depth of emotion and sophistication to the lyrics, making it a definitive version of this jazz standard.",
                youtubeEmbed: "UdNNN56BrrA"
              },
              {
                title: "Baby",
                year: 1932,
                description: "This upbeat, swinging number demonstrates Hall's ability to infuse joy and energy into her performances. Her playful vocals and precise timing perfectly complement the lively instrumental backing, creating an irresistible dance tune.",
                youtubeEmbed: "Ahnu-kTuH44"
              },
              {
                title: "Sophisticated Lady",
                year: 1933,
                description: "Hall's interpretation of this Duke Ellington composition highlights her ability to convey complex emotions through her voice. Her subtle inflections and rich tone bring out the melancholic beauty of the song, showcasing her mastery of ballad singing.",
                youtubeEmbed: "-Y__G3Pa5Fw"
              },
              {
                title: "I'm in the Mood for Love",
                year: 1935,
                description: "This romantic ballad allows Hall to display her versatility as a vocalist. Her gentle, nuanced performance captures the song's tender sentiment, while her occasional vocal embellishments add a touch of jazz sophistication.",
                youtubeEmbed: "EGjQLV-ZPQA"
              },
              {
                title: "Truckin'",
                year: 1935,
                description: "Hall's recording of this popular dance tune of the 1930s showcases her ability to deliver upbeat, rhythmic vocals. Her precise diction and swinging delivery make this track a prime example of her skill in handling uptempo material.",
                youtubeEmbed: "nkTMcUgfbos"
              },
              {
                title: "There's a Lull in My Life",
                year: 1937,
                description: "This lesser-known gem allows Hall to demonstrate her interpretive skills on a slower, more introspective number. Her controlled, emotive delivery brings out the poignancy of the lyrics, creating a captivating listening experience.",
                youtubeEmbed: "9OaJZf0SGVc"
              },
              {
                title: "As Time Goes By",
                year: 1944,
                description: "Hall's version of this timeless classic, recorded during her time in London, showcases her mature vocal style. Her understated yet deeply felt interpretation brings new depth to the familiar lyrics, demonstrating why she remained a respected artist for decades.",
                youtubeEmbed: "xEw9fDHe_rU"
              },
              {
                title: "The Moon Is Low",
                year: 1950,
                description: "This recording from later in Hall's career demonstrates her enduring vocal skills. Her rich, mellow tone and tasteful phrasing show how she adapted her style to changing musical trends while maintaining her jazz roots.",
                youtubeEmbed: "vypQTwOclJI"
              },
              {
                title: "Happiness Is a Thing Called Joe",
                year: 1957,
                description: "Closing our top 10 is this heartfelt rendition of the Harold Arlen and Yip Harburg standard. Hall's warm, intimate performance captures the essence of contentment and love, proving that her ability to connect emotionally with a song remained undiminished throughout her long career.",
                youtubeEmbed: "VxsKQ-taiW8"
              }
            ].map((song, index) => (
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

export default AdelaideLouiseHall;
