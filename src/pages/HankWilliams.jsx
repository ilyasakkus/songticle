import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft } from 'lucide-react';

const HankWilliams = () => {
  const songs = [
    {
      title: "Move It On Over",
      year: 1947,
      description: "In the ethereal realm of musical creation, \"A Mansion on the Hill\" stands as a gem born from the collaborative genius of Hank Williams and Fred Rose. This evocative composition, originally recorded by Williams on MGM Records, unfolds like a wistful melody that transcends time. Its poignant notes and heartfelt lyrics resonate with a sense of nostalgia, transporting listeners to a place of contemplation and longing. Amidst the enigmatic origins of the song, a tale has woven itself into the lore – a tale of how Fred Rose, after witnessing the brilliance of Williams' compositions, challenged the Alabama-bred artist to craft a song around the title \"A Mansion on the Hill.\" Legend has it that Williams, with a touch of magic in his fingers, retreated to a side room and conjured the very essence of longing and aspiration into melody. The result is a masterpiece that found its way into the hearts of many, leaving an indelible mark on the landscape of folk music history.",
      youtubeEmbed: "A5dZ2t5rf9w"
    },
    {
      title: "Cold Cold Heart",
      year: 1951,
      description: "In the rich tapestry of musical storytelling, \"Cold, Cold Heart\" emerges as an enduring masterpiece, written and originally recorded by none other than Hank Williams himself. This blues-infused ballad, which gracefully straddles the realms of honky-tonk and the Great American Songbook, is a testament to Williams' multifaceted genius. The song's roots trace back to T. Texas Tyler's rendition of \"You'll Still Be in My Heart,\" where Williams found the melodic inspiration that he would mold into the soul-stirring verses of \"Cold, Cold Heart.\" As recounted in the Williams episode of American Masters, the song's creation was imbued with poignant personal emotion, as Williams was stirred to write it after a heart-wrenching visit to his ailing wife, Audrey, who was facing the aftermath of a tragic event. This blues ballad, laden with emotion and sincerity, not only captures the essence of honky-tonk allure but also etches itself into the hearts of those who bear witness to its raw and evocative melody.",
      youtubeEmbed: "Wn2e4Dhod7M"
    },
    {
      title: "Hey Good Lookin'",
      year: 1951,
      description: "In the illustrious tapestry of Hank Williams' musical legacy, \"Hey, Good Lookin'\" stands as a resplendent jewel of timeless allure. Penned and performed by Williams in 1951, this captivating composition garnered not just admiration but a hallowed spot in the Grammy Hall of Fame in 2001. Its enchanting lyrics, brimming with flirtatious wordplay, evoke an irresistible invitation wrapped in culinary metaphors. As the narrative unfolds, Williams' beguiling charm weaves a tale of desire that escalates into promises of exclusivity, evoking the carefree spirit of romance. This country classic, also hailed as the 19th greatest song of country music by CMT, exudes a universal charm that transcends time. However, it's noteworthy that the song's origins boast a connection to Cole Porter's 1942 Broadway gem of the same title, underpinning its lyrical richness. From its inception, \"Hey, Good Lookin'\" beckoned listeners into a realm where the magic of music converges with the whimsy of flirtation, and where Hank Williams' unparalleled artistry casts an enduring spell.",
      youtubeEmbed: "bjCoKslQOEs"
    },
    {
      title: "Jambalaya",
      year: 1952,
      description: "\"Jambalaya (On the Bayou),\" a harmonious creation by the legendary Hank Williams, resonates as a musical celebration of culture and culinary delights. With its roots tracing back to the vibrant Cajun community, Williams concocted this flavorful melody while eavesdropping on conversations about food during his travels. Released in July 1952, the song captured the essence of life's pleasures, transcending genres to become Williams' most recorded masterpiece. Its Cajun-infused melody, a nod to the Cajun song \"Grand Texas,\" served as a canvas for Williams to paint the portrait of a bayou soirée, a poetic rendezvous marked by poling a pirogue through shallow waters and reveling in the company of Yvonne and her kin. Evoking the sensory delights of Cajun cuisine, including the titular jambalaya and crawfish pie, the song's playful narrative and infectious rhythm encapsulate the spirit of festivity. As the narrator toasts with fruit jar liquor and dances to the pulse of the bayou, \"Jambalaya (On the Bayou)\" transforms into a vivid tapestry of life, love, and the heartwarming flavors of Creole and Cajun culture.",
      youtubeEmbed: "b0-2OUcvBHs"
    },
    {
      title: "I Can't Help It (If I'm Still in Love with You)",
      year: 1951,
      description: "\"I Can't Help It (If I'm Still in Love with You),\" a heartfelt melody penned and originally performed by the venerable Hank Williams on MGM Records, stands as a timeless anthem of emotional resonance. Its soul-stirring charm soared to number two on the Billboard Country Singles chart in 1951, a testament to its universal appeal. With an elegantly simple yet profoundly evocative lyricism, the song encapsulates the complex intricacies of lingering love. The tale behind its creation, as recounted by fiddler Jerry Rivers, adds a touch of whimsy to its narrative. Conceived during a touring Sedan journey, its opening line \"Today I passed you on the street\" ignited a collaborative spark, leading to its poignant chorus. Recorded within the hallowed walls of Castle Studio in Nashville, the song's delicate essence found its timeless echo through Hank Williams' vocal prowess and its enduring status as an emblem of the human heart's enduring tug of emotions.",
      youtubeEmbed: "slFnQfwGJZE"
    },
    {
      title: "Move It On Over",
      year: 1947,
      description: "\"Move It On Over,\" a country music cornerstone penned and performed by the incomparable Hank Williams in 1947, resonates as an emblem of his musical evolution. Crafted during a seminal session at Castle Studio in Nashville on that fateful April 21st, Williams' lyrical prowess intertwines with a rhythm that's as timeless as it is infectious. This historic session marked Williams' debut under the MGM label, birthing not only \"Move It On Over\" but also other iconic tracks like \"I Saw the Light\" and \"(Last Night) I Heard You Crying in Your Sleep.\" With the keen guidance of producer Fred Rose, Williams enlisted the formidable backing band of Red Foley, who lent their unparalleled musicianship to the song's rich tapestry. While the musicians may have brought a touch of sophistication to the instrumental break, it's Williams' unmistakable voice and lyrical storytelling that ultimately leave an indelible imprint, showcasing his ability to blend hillbilly roots with a refined musicality.",
      youtubeEmbed: "9kolGH7dIyE"
    },
    {
      title: "Alone And Forsaken",
      year: 1955,
      description: "\"Alone and Forsaken,\" a poignant country ballad born from the soul of Hank Williams, stands as a testament to his profound ability to weave heartache into melody. Though initially left unheard by the world, this gem was revealed through a posthumous release by MGM in 1955, a poignant reflection on loneliness and isolation. Stripped down to Williams' haunting vocals accompanied by his acoustic guitar, the song's sparse arrangement envelops the listener in an emotional tapestry of desolation. Drawing on themes akin to his previous masterpiece \"I'm So Lonesome I Could Cry,\" \"Alone and Forsaken\" plunges into the depths of A minor, channeling a sense of melancholic gravity. Williams' evocative lyrics resonate as a somber echo of human emotion, a testament to his ability to craft timeless songs that etch themselves into the very fabric of the human experience.",
      youtubeEmbed: "yZdfXkqe8lo"
    },
    {
      title: "Lovesick Blues",
      year: 1949,
      description: "A timeless resonance of heartache, \"Lovesick Blues\" emerges as a masterpiece with a serendipitous history. Originating as a Tin Pan Alley composition, crafted by the hands of Cliff Friend and Irving Mills, its ethereal debut graced the 1922 musical \"Oh, Ernest.\" Yet, it wasn't until the soulful vocals of Elsie Clark and Jack Shea gave it life in that same year, followed by Emmett Miller's renditions in 1925 and 1928. The song's lineage of emotion continued when country crooner Rex Griffin took hold of its reins in 1939. However, it was the captivating echoes of Griffin and Miller that cast an enchanting spell on a young Hank Williams in 1948, igniting his performance on the Louisiana Hayride radio show. The fervent applause from the audience stirred Williams' determination, propelling him to brave the reluctance of his own producer and band. Williams' rendition was not just a cover; it was a soul-stirring reinvention that melded the past with the present, etching his indomitable mark on the legacy of \"Lovesick Blues\"",
      youtubeEmbed: "R46WSbXpMpE"
    },
    {
      title: "I Saw The Light",
      year: 1948,
      description: "\"I Saw the Light,\" a country gospel masterpiece by Hank Williams, was born from a poignant moment sparked by his mother's words after a concert. Recorded during his inaugural session with MGM Records in September 1948, the song initially experienced modest reception but evolved into a cherished cornerstone of Williams' live performances. From his rejection by the Grand Ole Opry to his collaboration with Acuff-Rose Music and Sterling Records, Williams' journey led to this transformative composition. With its resolute lyrics and luminous melody, \"I Saw the Light\" stands as a testament to Williams' enduring musical legacy and his ability to infuse faith and inspiration into his artistry.",
      youtubeEmbed: "pyiGHFGCf2U"
    },
    {
      title: "Long Gone Lonesome Blues",
      year: 1950,
      description: "In the sonic tapestry of Hank Williams' illustrious career, \"Long Gone Lonesome Blues\" stands as a resounding testament to his storytelling prowess. This 1950 masterpiece soared to the pinnacle of the Country & Western chart, marking Williams' second triumphant ascent to number-one status. With a melodic grip that refused to release its hold, the song resonated with audiences for an impressive 21 weeks on the charts, basking in the limelight for five weeks at the zenith. Williams' evocative lyrical journey and emotive vocal delivery combined to create a musical mosaic that encapsulated the very essence of heartache and solitude. \"Long Gone Lonesome Blues\" isn't just a song; it's a haunting symphony of raw emotion, etching its indomitable mark on the chronicles of country music history.",
      youtubeEmbed: "UDRzixp1Fvw"
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
          <h1 className="text-4xl font-bold mb-4">Hank Williams</h1>
          <p className="text-xl mb-8">
            Hank Williams, an emblematic figure of 20th-century American music, left an indelible imprint with his poignant songs delving into the depths of human emotions. Born in Alabama, Williams' journey to musical greatness began under the guidance of blues artist Rufus Payne, eventually leading him from local stages to radio waves. His chart-topping singles, numbering over 55, captured the essence of universal experiences like love and heartache, while iconic tracks such as "Lovesick Blues," "Your Cheatin' Heart," and "Hey, Good Lookin'" showcased his storytelling prowess. Amidst his soaring success, Williams' battles with addiction and personal turmoil served as a stark reminder of the complex interplay between brilliance and vulnerability.
          </p>
          <p className="text-xl mb-8">
            Williams' unparalleled influence reverberated through generations, shaping the artistry of luminaries like Elvis Presley, Johnny Cash, and Bob Dylan. His compositions transcended mere melodies, becoming a conduit for raw emotion and relatable narratives. Williams' accolades included inductions into the Country Music Hall of Fame, Songwriters Hall of Fame, Rock and Roll Hall of Fame, and a posthumous Pulitzer Prize Special Citation. Despite a life cut short at the age of 29, his enduring legacy continues to inspire, reminding us that his music remains a timeless beacon in the ever-evolving landscape of American culture.
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

export default HankWilliams;