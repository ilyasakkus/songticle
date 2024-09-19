import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft } from 'lucide-react';

const SamCooke = () => {
  const songs = [
    {
      title: "A Change Is Gonna Come",
      year: 1964,
      description: "\"A Change Is Gonna Come\" stands as an iconic song by the talented American singer-songwriter, Sam Cooke. Originally featured on Cooke's album \"Ain't That Good News,\" released in mid-February 1964 under RCA Victor, a slightly edited version of the recording later emerged as a single on December 22, 1964. Produced by Hugo & Luigi and skillfully arranged and conducted by René Hall, the song found its place as the B-side to \"Shake.\" The inspiration behind \"A Change Is Gonna Come\" stems from pivotal events in Cooke's own life, notably an incident where he and his entourage were denied accommodation at a whites-only motel in Louisiana. This encounter deeply affected Cooke, prompting him to compose a song that would reflect his personal struggles and resonate with others in the midst of the Civil Rights Movement. With its poignant lyrics and impassioned delivery, the song encapsulates the aspirations and challenges faced by African Americans during that era.",
      youtubeEmbed: "wEBlaMOmKV4"
    },
    {
      title: "What A Wonderful World",
      year: 1960,
      description: "\"Wonderful World,\" also known as \"(What A) Wonderful World,\" is a captivating song crafted by the renowned American singer-songwriter, Sam Cooke. Originally recorded during an impromptu session in March 1959, it was released by Keen Records on April 14, 1960, marking Cooke's last recording session with the label before he signed with RCA Victor later that year. Interestingly, \"Wonderful World\" remained unreleased until it was issued as a single in competition with Cooke's new record label. The song underwent lyrical revisions by Cooke, with a focus on incorporating themes of education. The release of \"Wonderful World\" proved to be a significant moment for Cooke, as it outperformed several of his early RCA singles, becoming his most successful hit since \"You Send Me\" in 1957. The song climbed to number 12 on the Billboard Hot 100 chart and reached an impressive number two position on Billboard's Hot R&B Sides chart.",
      youtubeEmbed: "R4GLAKEjU4w"
    },
    {
      title: "Another Saturday Night",
      year: 1963,
      description: "\"Another Saturday Night,\" a chart-topping single released in 1963, showcases the undeniable talent of Sam Cooke, and it is featured on his album \"Ain't That Good News.\" The song was crafted by Cooke while on tour in England, where he encountered a hotel that prohibited female guests. This experience inspired the lyrics, adding a personal touch to the soulful tune. \"Another Saturday Night\" achieved notable success, reaching No. 10 on the Billboard Hot 100 and holding the No. 1 spot on the R&B chart for a week. In the UK, it peaked at No. 23 on the UK Singles Chart. Cooke's rendition of the song stands out with its unique spoken recitation during the instrumental break, adding an extra layer of depth to the track. Notably, session drummer Hal Blaine contributed his talent to Cooke's version, enriching the overall sound and rhythm.",
      youtubeEmbed: "0O8m0mMDpHw"
    },
    {
      title: "Bring It On Home to Me",
      year: 1962,
      description: "Released on May 8, 1962, by RCA Victor, \"Bring It On Home to Me\" stands as a soulful masterpiece by the esteemed American singer Sam Cooke. Produced by Hugo & Luigi, and expertly arranged and conducted by René Hall, this captivating song served as the B-side to Cooke's hit single \"Having a Party.\" Interestingly, both \"Bring It On Home to Me\" and \"Having a Party\" were written while Cooke was on tour for Henry Wynn. Initially intended for fellow singer Dee Clark, the song was ultimately passed on by him. However, \"Bring It On Home to Me\" went on to become a pop standard, transcending genres and being covered by numerous artists. Its impact is further highlighted by its inclusion in The Rock and Roll Hall of Fame's prestigious list of 500 Songs that Shaped Rock and Roll. Notably, the song is a significant reworking of Charles Brown's 1959 single, \"I Want to Go Home,\" maintaining the gospel essence and call-and-response format while offering a distinct refrain that sets it apart from its predecessor.",
      youtubeEmbed: "g3ncYwtsQWY"
    },
    {
      title: "Good Times",
      year: 1964,
      description: "\"Good Times,\" a captivating composition, emerged from the creative genius of Sam Cooke and was released as a single in 1964. This soulful gem showcases Cooke's ability to craft lyrics that embody a perfect balance of sentimental emotion. It is a testament to his artistic prowess and musical brilliance. Renowned music critic Dave Marsh, reflecting on Cooke's body of work in a 1971 review, highlighted the remarkable sentimentality captured in Cooke's lyrics, inviting listeners to delve into the world of \"Good Times\" and experience the sheer beauty of Cooke's musical artistry.",
      youtubeEmbed: "TYoQWcb3SGg"
    },
    {
      title: "You Send Me",
      year: 1957,
      description: "In 1957, the iconic American singer Sam Cooke penned and originally recorded the timeless hit, \"You Send Me.\" Released as a single under Keen Records, this soulful gem captured the hearts of listeners worldwide. Produced by Bumps Blackwell and masterfully arranged and conducted by René Hall, the song exemplifies Cooke's songwriting genius. Interestingly, Cooke attributed the writing credit to his younger brother L.C. (spelled \"Cook\" in the original family name) to prevent his own publisher from profiting off the song. The classic version of \"You Send Me\" was recorded in Los Angeles in June 1957, alongside another track from the same session, a soulful rendition of \"Summertime.\" The debut single skyrocketed to the top of both Billboard's Rhythm & Blues Records chart and the Billboard Hot 100, cementing its status as a chart-topping sensation and solidifying Cooke's place in music history.",
      youtubeEmbed: "_y3VnMm53pc"
    },
    {
      title: "Ease My Troublin' Mind",
      year: 1965,
      description: "The soulful and introspective track \"(Somebody) Ease My Troublin' Mind\" was written and initially released by the legendary Sam Cooke himself. It made its debut on his album \"Shake\" in 1965, showcasing Cooke's profound songwriting and captivating vocal prowess. Shake\" marks the poignant and significant posthumous studio album of the renowned American singer-songwriter, Sam Cooke. Released following his untimely passing, this album stands as a testament to Cooke's enduring musical legacy. It showcases his remarkable talent and offers a glimpse into the artistry that was tragically cut short. Notably, two years after the album's release, the captivating melody and arrangement of \"Yeah Man,\" a standout track from \"Shake,\" fell victim to plagiarism. Arthur Conley and Otis Redding shamelessly appropriated the composition for their own song, \"Sweet Soul Music,\" which swiftly climbed the charts and became a resounding success for Conley.",
      youtubeEmbed: "EYjQ40IiS-g"
    },
    {
      title: "That's Where It's At",
      year: 1964,
      description: "Penned by the talented duo of Sam Cooke and J.W. Alexander, \"That's Where It's At\" stands as a remarkable composition in the soul music landscape. Originally recorded by Cooke, this soulful masterpiece was released as a single in September 1964, captivating audiences with its irresistible charm. The recording process, which took place on August 20, 1963, at the renowned RCA studio in Los Angeles, witnessed an impressive 32 takes before the final version emerged. Despite its delayed release, \"That's Where It's At\" has garnered well-deserved critical acclaim over the decades. This enduring classic holds the prestigious position of being ranked 876th in American music critic Dave Marsh's esteemed 1989 compilation, \"The Heart of Rock and Soul: The 1001 Greatest Singles Ever Made.\" Such recognition solidifies the song's status as a true gem within the vast tapestry of soul music history.",
      youtubeEmbed: "z1q9OzZq4tM"
    },
    {
      title: "Meet Me At Mary's Place",
      year: 1962,
      description: "\"Meet Me at Mary's Place,\" a captivating composition penned by the incomparable Sam Cooke, made its initial debut through the soulful rendition of Johnnie Morisette in 1962. This soulful gem, born from Cooke's creative genius, showcases his prowess as both a talented songwriter and a visionary artist. With its infectious rhythm and heartfelt lyrics, \"Meet Me at Mary's Place\" captivated listeners from the very first note, leaving an indelible mark on the annals of soul music history.",
      youtubeEmbed: "415jQbRu_DE"
    },
    {
      title: "Just For You",
      year: 1961,
      description: "\"Just For You\" is a timeless classic that showcases the sheer brilliance of Sam Cooke as both a singer and a songwriter. Released in 1961 as the title track of his album \"The Man and His Music\", this enchanting ballad effortlessly captures the essence of Cooke's musical genius. The song begins with a gentle piano melody, setting the stage for Cooke's velvety smooth vocals to take center stage. \"Just For You\" is a love song that exudes tenderness and devotion. Cooke's heartfelt delivery and soulful inflections make every word feel deeply sincere. The lyrics speak of a love so pure and profound that the narrator is willing to go to great lengths to bring happiness and joy to their beloved. It's a sentiment that resonates with listeners and tugs at the heartstrings. This song is Funk / Soul. It was produced by Kags Music.",
      youtubeEmbed: "WuBTc8cM3U4"
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
          <h1 className="text-4xl font-bold mb-4">Sam Cooke</h1>
          <p className="text-xl mb-8">
            Sam Cooke's smooth voice and timeless melodies have made him one of the most influential figures in the history of soul music. His impact on the genre is immeasurable, and his songs continue to captivate audiences around the world. Born in 1931 in Clarksdale, Mississippi, Cooke began his musical journey as a member of the gospel group The Soul Stirrers. His rich and emotive voice quickly gained attention, captivating audiences with its power and versatility. In the late 1950s, Cooke transitioned to secular music, embarking on a solo career that would solidify his status as a music icon. He seamlessly blended gospel, R&B, and pop influences, creating a unique sound that resonated with listeners of all backgrounds. Tragically, Cooke's life was cut short in 1964, but his music continues to inspire and enchant audiences, making him an everlasting legend in the music industry.
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

export default SamCooke;