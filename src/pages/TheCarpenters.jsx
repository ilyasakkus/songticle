import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft } from 'lucide-react';

const TheCarpenters = () => {
  const songs = [
    {
      title: "Carpenters Greatest Hits Songs Album",
      year: "Various",
      description: "Dive into the enchanting world of timeless melodies with the Best of Carpenters' Greatest Hits—a compilation that encapsulates the legendary duo's unparalleled musical journey. With every note, Karen's dulcet contralto and Richard's harmonious arrangements converge to create a symphony of emotions. From the heartwarming balladry of \"Close to You\" to the melancholic resonance of \"Rainy Days and Mondays,\" this collection weaves a sonic tapestry that traverses love, longing, and introspection. As the Carpenters' hits unfold, it's impossible not to be swept away by their artistry, a testament to their indomitable legacy within the realm of soft rock and adult contemporary music.",
      youtubeEmbed: "Gx9a4XT4SO8"
    },
    {
      title: "The Royal Philharmonic Orchestra - Superstar",
      year: 1969,
      description: "\"Superstar,\" a timeless 1969 composition by Bonnie Bramlett and Leon Russell, with an additional songwriting nod to Delaney Bramlett, has gracefully transcended genres and generations with its emotional resonance. This melodic masterpiece has been embraced by diverse artists over the years, yielding an array of interpretations that have left an indelible mark. Among the most iconic renditions stand those of the Carpenters, who imbued the song with their signature ethereal touch in 1971, and the soulful Luther Vandross, who breathed new life into it in 1983. Through its enduring allure, \"Superstar\" emerges as a testament to the power of music to evoke emotion and connect us across time, solidifying its place as a cherished gem in the ever-evolving tapestry of musical expression.",
      youtubeEmbed: "eGrLUavvkIA"
    },
    {
      title: "Ticket To Ride",
      year: 1969,
      description: "\"Ticket to Ride,\" the Carpenters' debut studio album, emerged initially as \"Offering\" in 1969, featuring a different cover photo and yielding a solitary minor hit with their poignant rendition of \"Ticket to Ride.\" After the duo's subsequent rise to fame, the album reemerged as \"Ticket to Ride\" internationally, unveiling the Carpenters' formative sound and showcasing their musical versatility. The album's self-contained nature highlighted Karen and Richard Carpenter's instrumental prowess, with most tracks written by Richard and lyricist John Bettis. With a balanced distribution of lead vocals between Karen and Richard, and Karen taking up drumming duties, the album captures the essence of their early artistic journey and sets the stage for their remarkable trajectory in the world of music.",
      youtubeEmbed: "QdBKAnAhzXo"
    },
    {
      title: "Merry Christmas, Darling",
      year: 1970,
      description: "\"Merry Christmas, Darling,\" an enchanting Christmas carol by the Carpenters, composed by the skilled Richard Carpenter with heartfelt lyrics penned by Frank Pooler, originally graced the airwaves in 1970. This melodic gem, first released as a 7-inch single (A&M Records 1236), has become an enduring holiday favorite, adorned with a gentle melody that resonates with seasonal nostalgia. Its timeless allure prompted re-issues in 1974 (A&M 1648) and 1977 (A&M 1991), soaring to the zenith of Billboard's Christmas singles chart in 1970, and reclaiming its place at number one in subsequent years.",
      youtubeEmbed: "IOvclFSSlJk"
    },
    {
      title: "Carpenters With The Royal Philharmonic Orchestra",
      year: 2018,
      description: "\"Carpenters with the Royal Philharmonic Orchestra\" stands as a captivating compilation album by the renowned American duo, the Carpenters. Released on December 7, 2018, under A&M Records and Universal Music Enterprises, the album presents the Carpenters' cherished \"original vocal and instrumental tracks\" adorned with new and enchanting orchestral arrangements, skillfully crafted by the prestigious Royal Philharmonic Orchestra. The genius behind these orchestrations lies with Richard Carpenter, who not only produced but also arranged and conducted the album. This harmonious collaboration offers a fresh perspective on the Carpenters' timeless classics, infusing them with a renewed sense of grandeur and emotional depth.",
      youtubeEmbed: "OR0UBZB5kuk"
    },
    {
      title: "Superstar",
      year: 1971,
      description: "\"Superstar,\" a hauntingly beautiful song that found its zenith through the Carpenters' rendition, was propelled to prominence after Richard Carpenter chanced upon Bette Midler's performance on The Tonight Show with Johnny Carson on February 15, 1971. Richard's discovery paved the way for the Carpenters to lend their signature touch to the melody. Produced by Richard Carpenter and Jack Daugherty, the track was brought to life with the exceptional talents of the Wrecking Crew, a renowned assembly of Los Angeles-based session musicians.",
      youtubeEmbed: "SJmmaIGiGBg"
    },
    {
      title: "Rainy Days And Mondays",
      year: 1971,
      description: "\"Rainy Days and Mondays,\" a poignant Carpenters' ballad from their third album, accompanied by the instrumental talents of the Wrecking Crew, was penned by Paul Williams and Roger Nichols, the duo behind their hit \"We've Only Just Begun.\" Richard Carpenter's connection to the song was immediate upon hearing a demo, leading to its recording a few weeks prior to Karen's 21st birthday. The song's stripped-down arrangement was carefully curated to showcase Karen's vocal prowess, resulting in its ascent to number 2 on the Billboard Hot 100 chart for seven weeks.",
      youtubeEmbed: "PjFoQxjgbrs"
    },
    {
      title: "Hurting Each Other",
      year: 1971,
      description: "\"Hurting Each Other,\" a poignant musical offering by The Carpenters, resonates with emotional depth and melodic allure. Recorded towards the end of 1971 with the instrumental talents of L.A. session musicians from the esteemed Wrecking Crew, the song captured the essence of heartache and vulnerability. As Richard and Karen Carpenter lent their exquisite vocal harmonies to the backup, a glimpse of their artistry was showcased on \"Jerry Dunphy Visits the Carpenters,\" where news anchor Jerry Dunphy delved into their lives through an intimate interview.",
      youtubeEmbed: "sqkVNHwJfKc"
    },
    {
      title: "Close To You",
      year: 1970,
      description: "\"(They Long to Be) Close to You\" stands as an iconic musical creation, penned by the illustrious songwriting duo Burt Bacharach and Hal David. The Carpenters' rendition, featured on their second studio album \"Close to You\" (1970) and expertly produced by Jack Daugherty, transformed the song into a timeless masterpiece. Unveiled on May 14, 1970, this melodic gem swiftly ascended to the pinnacle of musical charts, clinching the number one spot on the US Billboard Hot 100 and Adult Contemporary charts.",
      youtubeEmbed: "HYnV_pkO-Rw"
    },
    {
      title: "Only Yesterday",
      year: 1975,
      description: "\"Only Yesterday,\" a captivating song composed by Richard Carpenter and John Bettis, showcases the Carpenters' musical brilliance, with Karen's enchanting multi-tracked vocals soaring over a dynamic arrangement. Released in 1975, the track reached number four on the Billboard Hot 100 and secured the number one spot on the Adult Contemporary charts, showcasing the duo's enduring appeal. The song's music video seamlessly blended studio scenes with serene visuals from Huntington Library Gardens, underlining its melodic allure and artistic depth.",
      youtubeEmbed: "evETS8_WFGE"
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
          <h1 className="text-4xl font-bold mb-4">The Carpenters</h1>
          <p className="text-xl mb-8">
            The Carpenters, comprised of siblings Karen and Richard Carpenter, stand as one of the most beloved and influential musical acts of the 20th century. Known for their melodic soft rock sound and Karen's distinctive contralto vocals, The Carpenters left an indelible mark on the music industry, selling over 100 million records worldwide. Their journey from Downey, California, to international stardom is a testament to their extraordinary talent and the universal appeal of their music.
          </p>
          <p className="text-xl mb-8">
            Throughout their career, The Carpenters achieved remarkable success, including three Grammy Awards, 18 Billboard Hot 100 No. 1 hits, 15 gold singles, and 8 gold albums. Their music resonated deeply with audiences, addressing themes of love, longing, and human connection. Despite facing personal challenges, including Karen's battle with anorexia nervosa, their legacy continues to inspire new generations of artists and listeners alike.
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

export default TheCarpenters;