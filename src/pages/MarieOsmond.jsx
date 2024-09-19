import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft } from 'lucide-react';

const MarieOsmond = () => {
  const songs = [
    {
      title: "Band On The Run",
      year: 1979,
      description: "\"Band On The Run\" is an electrifying cover song by Donny & Marie Osmond, showcasing their versatility and ability to infuse their unique style into a classic hit. Originally recorded by Paul McCartney and Wings in 1973, Donny and Marie brought their own flair and energy to this iconic track. Released in 1979, their rendition of \"Band On The Run\" captivated audiences with its infectious groove and dynamic vocals. The Osmond siblings delivered a powerful performance, effortlessly capturing the spirit of the original while adding their own signature touch. The song's driving rhythm, catchy melodies, and intricate harmonies highlighted Donny and Marie's exceptional vocal range and precision.",
      youtubeEmbed: "6WJxN8W5q8g"
    },
    {
      title: "Baby, I'm Sold On You",
      year: 1978,
      description: "\"Baby, I'm Sold On You\" is a captivating song by Donny & Marie Osmond, showcasing their undeniable chemistry and charm. Released in 1978, this track encapsulates the joy and excitement of newfound love. The song's infectious melodies and upbeat rhythm immediately grab the listener's attention, setting the stage for an enchanting musical journey. Donny and Marie's vocals effortlessly intertwine, conveying a sense of playfulness and affection that is impossible to resist. \"Baby, I'm Sold On You\" exudes a sense of pure happiness, celebrating the exhilaration of being swept off one's feet by love. The lyrics beautifully express the overwhelming emotions and devotion that come with discovering a deep connection with someone special.",
      youtubeEmbed: "zLiMqrK4MpY"
    },
    {
      title: "Winning Combination",
      year: 1979,
      description: "\"Winning Combination\" is a dynamic and infectious song by Donny & Marie Osmond, showcasing the extraordinary synergy between the talented siblings. Released in 1979, this energetic track exemplifies the Osmonds' ability to create a winning musical formula. The song's upbeat tempo, catchy melodies, and vibrant instrumentation perfectly complement Donny and Marie's charismatic vocals. \"Winning Combination\" encapsulates the essence of their collaborative spirit, as their voices blend seamlessly, creating a harmonious and electrifying sound.",
      youtubeEmbed: "OLL8JaOfp5o"
    },
    {
      title: "(You're My) Soul And Inspiration",
      year: 1978,
      description: "\"(You're My) Soul And Inspiration\" is a captivating song recorded by Donny & Marie Osmond, showcasing their undeniable musical talent and the deep connection they share as siblings. Released as a single in 1978, the track pays homage to the original version by The Righteous Brothers, infusing it with the Osmonds' unique style and flair. Donny and Marie's rendition captures the essence of the song's heartfelt lyrics, expressing profound affection and devotion to a loved one. Their harmonious vocals intertwine effortlessly, creating a soulful and mesmerizing musical experience. The Osmonds' interpretation of \"(You're My) Soul And Inspiration\" resonates with audiences, evoking a range of emotions and touching the depths of the human spirit. Through their powerful delivery and heartfelt performance, Donny and Marie infuse new life into the beloved classic, leaving an indelible mark on the hearts of listeners. Their version of \"(You're My) Soul And Inspiration\" serves as a testament to the enduring power of love and the timeless appeal of their musical artistry.",
      youtubeEmbed: "Lda9GvNf3IM"
    },
    {
      title: "Elvis Presley Tribute",
      year: 1977,
      description: "The Donny & Marie Osmond's Elvis Presley Tribute performance on October 7, 1977, stands as a remarkable testament to their admiration and respect for the King of Rock and Roll. In this heartfelt tribute, Donny and Marie paid homage to the legendary Elvis Presley, showcasing their immense talent and love for his music. The siblings poured their hearts into the performance, capturing the essence of Elvis's charisma and energy. Their renditions of Elvis's iconic songs transported the audience back to the golden era of rock and roll, evoking a sense of nostalgia and celebration. The tribute served as a poignant reminder of the profound impact Elvis had on the music industry and the lasting legacy he left behind. Donny and Marie's tribute not only honored the memory of an influential figure but also showcased their own artistry and ability to captivate an audience. Through their sincere and captivating performances, the Osmonds ensured that Elvis Presley's spirit lived on, leaving a lasting impression on all who witnessed their remarkable tribute.",
      youtubeEmbed: "i4MMEmHmDWw"
    },
    {
      title: "I'm Leaving It All Up to You",
      year: 1974,
      description: "\"I'm Leaving It All Up to You\" marked the impressive debut album by the dynamic sibling duo, Donny & Marie Osmond, released in 1974. This captivating record showcased their immense talent and undeniable chemistry. The album's success was propelled by two standout singles. First, the titular track \"I'm Leaving It (All) Up to You\" captured the hearts of listeners, ascending to #4 on the US Pop charts and reaching #17 on the Country charts, solidifying the Osmond's cross-genre appeal. The infectious energy and soulful vocals displayed in this song were a testament to the duo's exceptional musical prowess. Additionally, \"Morning Side of the Mountain\" emerged as another hit from the album, claiming the #8 spot on the US Pop charts. This enchanting tune showcased Donny & Marie's ability to convey raw emotion and captivate audiences with their harmonious blend of voices. The album's success firmly established the Osmond siblings as a force to be reckoned with in the music industry, captivating audiences worldwide and setting the stage for their enduring musical journey.",
      youtubeEmbed: "S67rzwCtHv4"
    },
    {
      title: "Morning Side Of The Mountain",
      year: 1974,
      description: "\"Morning Side of the Mountain\" is a timeless gem, penned by the talented duo Larry Stock and Dick Manning, which has woven its melody into the fabric of music history. Originally recorded by Tommy Edwards in 1951, the song found moderate success, peaking at #24 on the pop chart. However, it experienced a revival when Edwards reimagined it in 1959, climbing to #27 on the Billboard Hot 100. The song's enduring charm continued to captivate audiences, as demonstrated by Donny & Marie Osmond's remarkable rendition in 1974. Their heartfelt interpretation propelled \"Morning Side of the Mountain\" to impressive heights, claiming the #8 spot on the Billboard Hot 100 and even reigning over the Easy Listening chart for a glorious week. The song's universal appeal transcended borders, resonating equally well in Canada and the UK, solidifying its status as a cherished international classic. With its timeless lyrics and enchanting melody, \"Morning Side of the Mountain\" remains a testament to the enduring power of music to touch hearts across generations.",
      youtubeEmbed: "8E3mhBSGifU"
    },
    {
      title: "Suddenly",
      year: 1980,
      description: "Marie Osmond & Andy Gibb's iconic duet, 'Suddenly,' is a timeless masterpiece that captures the essence of love and longing. Released in 1980, the song showcases the incredible vocal chemistry between two legendary artists, Marie Osmond and Andy Gibb. With its heartfelt lyrics and captivating melody, 'Suddenly' takes listeners on a journey of emotions, immersing them in a world of romance and yearning. The enchanting harmonies and powerful vocals of Osmond and Gibb blend seamlessly, creating a mesmerizing and unforgettable musical experience. 'Suddenly' remains a cherished classic, reminding us of the enduring magic that can be found in the realm of love and music.",
      youtubeEmbed: "nQcPC9HnJbk"
    },
    {
      title: "Paper Roses",
      year: 1973,
      description: "\"Paper Roses\" is a classic pop-country song recorded by Marie Osmond. Released in 1973 as her debut single, the song quickly became a major hit and established Osmond as a solo artist. It reached the top of the Billboard Country chart and peaked at number five on the Billboard Hot 100. \"Paper Roses\" tells a poignant story of a young girl who is infatuated with someone she believes loves her, much like the fragility of paper roses. The lyrics express the innocence and naivety of love, contrasting the delicate nature of paper roses with the enduring nature of true love. The song's heartfelt lyrics and Osmond's sweet, tender vocals resonated with audiences, contributing to its immense popularity. The song's success propelled Marie Osmond into the spotlight as a solo artist. The combination of her youthful charm and powerful vocals made \"Paper Roses\" a standout track in her career and an enduring classic in the country music genre. \"Paper Roses\" has been covered by numerous artists over the years, but Marie Osmond's rendition remains the most well-known. The song's timeless appeal continues to touch hearts and has solidified its place as one of Marie Osmond's signature songs.",
      youtubeEmbed: "6bVKxRhM1P8"
    },
    {
      title: "Meet Me In Montana",
      year: 1985,
      description: "\"Meet Me In Montana\" is a popular country duet performed by Marie Osmond and Dan Seals. Released in 1985 as a single from Osmond's album \"There's No Stopping Your Heart,\" the song quickly became a hit, reaching the top of the Billboard Hot Country Singles chart. \"Meet Me In Montana\" tells the story of two lovers who are separated by distance but find solace in their dreams of being together. The lyrics depict a heartfelt longing for a reunion, as they yearn for a place where they can escape their current circumstances and be together again. The song's emotional depth and relatable theme struck a chord with listeners, contributing to its widespread popularity.",
      youtubeEmbed: "S2R6mzqqAZE"
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
          <h1 className="text-4xl font-bold mb-4">Marie Osmond</h1>
          <p className="text-xl mb-8">
            Marie Osmond is an American singer, actress, and television personality known for her role in the popular singing group "The Osmonds" and her successful solo career. Born into a musical family, Marie showcased her talent from a young age and achieved international fame in the 1970s. She has released numerous hit songs, including "Paper Roses," and has excelled in various genres. Marie has also pursued acting, hosting her own talk show with her brother Donny, and engaging in philanthropy. With her enduring success, authenticity, and dedication, Marie Osmond has left a lasting impact on the entertainment industry and popular culture.
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

export default MarieOsmond;