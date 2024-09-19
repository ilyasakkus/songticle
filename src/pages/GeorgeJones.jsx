import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft } from 'lucide-react';

const GeorgeJones = () => {
  const songs = [
    {
      title: "George Jones Best Songs",
      year: "Various",
      description: "\"George Jones Best Songs\" encapsulates a treasure trove of timeless melodies that define the very essence of country music. With an illustrious career spanning decades, George Jones left an indelible mark on the genre, enchanting audiences with his emotive storytelling and unmatched vocal prowess. \"George Jones Best Songs\" pays homage to a legendary artist whose musical legacy continues to captivate, inspire, and resonate with listeners, making an indomitable mark on the annals of musical history.",
      youtubeEmbed: "NGfRBO4IRvU"
    },
    {
      title: "Who's Gonna Fill Their Shoes",
      year: 1985,
      description: "Embark on a poignant musical odyssey with \"Who's Gonna Fill Their Shoes\" an emotive melody penned by Troy Seals and Max D. Barnes, and elegantly delivered by the incomparable George Jones. Released in the summer of '85 as the lead single from his album of the same name, this song stands as a heartfelt tribute to the titans of country music whose echoes linger eternally. Jones' mellifluous voice weaves a lyrical tapestry, paying homage to luminaries like Waylon Jennings, Johnny Cash, and Merle Haggard, whose contributions have shaped the very soul of country music. As the notes unfurl, Jones' contemplative verses become a somber reflection on the passing of legends and the undeniable void they leave behind.",
      youtubeEmbed: "vxHjRqnY7zA"
    },
    {
      title: "Wrong's What I Do Best",
      year: 1992,
      description: "Wrong's What I Do Best is a musical gem brought to life by the legendary George Jones. With a signature blend of charisma and raw emotion, Jones effortlessly navigates the complexities of human flaws and desires in this evocative composition. Released under the spotlight of his iconic artistry, the song showcases Jones' uncanny ability to capture the intricate shades of human nature. As the melodies swirl like a hypnotic dance, \"Wrong's What I Do Best\" becomes a poignant reflection on the human experience, flawlessly illustrating how missteps and imperfections are woven into the very fabric of existence. With every note, Jones' velvety voice carries a sense of vulnerability and authenticity, inviting us to embrace the imperfections that define us all.",
      youtubeEmbed: "d6YGmHE-2XA"
    },
    {
      title: "She Loved A Lot In Her Time",
      year: 1991,
      description: "Prepare to be entranced by the ethereal melodies of \"She Loved A Lot In Her Time\" an enchanting composition brought to life by the legendary George Jones. With his distinctive artistry, Jones weaves a poignant narrative that unfurls like petals in a poetic reverie. This musical gem, a testament to his profound emotive prowess, casts a mesmerizing spell, inviting listeners to immerse themselves in a tale of love's fleeting yet enduring impact. As the notes cascade like gentle rain, \"She Loved A Lot In Her Time\" paints a vivid tapestry of emotions, capturing the essence of a love that burned brightly against the backdrop of life's intricate complexities.",
      youtubeEmbed: "6Pcq86dPgBw"
    },
    {
      title: "Wild Irish Rose",
      year: 1998,
      description: "Embark on an evocative auditory journey with \"Wild Irish Rose,\" a melodious treasure crafted by none other than the iconic George Jones. It was released in 1998. This enchanting composition, adorned with Jones' inimitable vocal finesse, encapsulates the essence of a timeless tale. Released under the spotlight of country music's stage, this harmonious bouquet of emotions flourishes with a tender embrace of nostalgia and longing. As the notes dance and entwine, \"Wild Irish Rose\" paints a lyrical canvas that speaks to the heart, weaving a narrative that resonates with the soul's most profound sentiments.",
      youtubeEmbed: "UfAPhJW5fOY"
    },
    {
      title: "Walls Can Fall",
      year: 1992,
      description: "Step into the enchanting world of country virtuoso George Jones with his mesmerizing album \"Walls Can Fall,\" a 1992 opus that effortlessly weaves tales of heartache and hope. Released under the revered MCA Nashville Records, this musical gem casts an irresistible spell, beckoning listeners into a journey of raw emotion and lyrical artistry. Amidst the intricate melodies and Jones' unmistakable vocals, \"Walls Can Fall\" resonates as a testament to his enduring prowess, etching a resonant mark on both the Billboard Country Albums chart and The Billboard 200 chart. With a harmonious blend of vulnerability and strength, this album solidified its status as gold, captivating hearts and proving, once again, the indomitable force of George Jones' musical mastery.",
      youtubeEmbed: "joOsn_eH-vQ"
    },
    {
      title: "Honky Tonk Song",
      year: 1996,
      description: "Indulge in the irresistible rhythms of \"Honky Tonk Song,\" a timeless country gem adorned by the inimitable George Jones. With his signature style and captivating presence, Jones elevates this song to a euphoric dance floor anthem that leaves no foot tapping in vain. As the melodic notes and twangy guitar strings blend harmoniously, one cannot resist being transported to the vibrant world of honky-tonk revelry. This ode to the honky-tonk spirit embodies the essence of classic country music, paying homage to the genre's roots and George Jones' unparalleled artistry.",
      youtubeEmbed: "h2OA1ldr8H4"
    },
    {
      title: "The Love In Your Eyes",
      year: 1991,
      description: "\"The Love In Your Eyes\" by the illustrious George Jones - a captivating auditory journey that beckons the soul with its heartfelt serenade. This charming ballad, crafted with unparalleled finesse, graced the airwaves under Jones' timeless artistry, leaving an indelible mark on the world of country music. With every lyrical caress and tender note, Jones unravels a narrative of profound affection, drawing listeners into a mesmerizing embrace of love's essence. The song's ethereal allure and Jones' emotive prowess intertwine seamlessly, fashioning a sonic tapestry that transcends time and space.",
      youtubeEmbed: "npotADm9z2o"
    },
    {
      title: "He Stopped Loving Her Today",
      year: 1980,
      description: "In the hallowed annals of country music, one song reigns supreme as an unassailable masterpiece: \"He Stopped Loving Her Today,\" the crown jewel of George Jones' illustrious career. This iconic ballad, born from the poetic minds of Bobby Braddock and Curly Putman, stands tall as a testament to the emotive prowess of the late, great Jones. Unleashed upon the world in April 1980 as the lead single from his album \"I Am What I Am,\" this magnum opus marked a triumphant return for Jones, securing his first solo No. 1 single in six years. With heartfelt storytelling and Jones' unparalleled vocal finesse, the song effortlessly captures the essence of heartbreak, weaving a melancholic tapestry that resonates deeply with countless souls.",
      youtubeEmbed: "YdlOfrtEx4U"
    },
    {
      title: "The Old Man No One Loves",
      year: 1988,
      description: "\"The Old Man No One Loves\" is a poignant country ballad written by Wyman Asbill and recorded by the legendary George Jones for his 1988 album, \"Too Wild Too Long,\" released under Epic Records. Although it showcased the same heart-wrenching emotion that made Jones' signature song \"He Stopped Loving Her Today\" an iconic hit, \"The Old Man No One Loves\" faced a more challenging journey on the charts. Despite Billy Sherrill's masterful production and a compelling recitation recounting the protagonist's funeral, the song fell short of making it into the Top 50, peaking at #63 on the Billboard country singles chart.",
      youtubeEmbed: "XaPJmC2S3VU"
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
          <h1 className="text-4xl font-bold mb-4">George Jones</h1>
          <p className="text-xl mb-8">
            George Jones, the illustrious American country musician, remains an enduring icon in the realm of musical brilliance. With a distinctive voice and a soulful phrasing that captured the hearts of millions, Jones' melodies transcended borders, earning him international fame. Adored for his emotional ballads, none could rival the depths to which Jones submerged himself in the essence of each song, evoking profound sentiments within listeners. Revered as the "Rolls-Royce of Country Music," his chart-topping records exceeded 160 singles, etching his name indelibly into the annals of musical history.
          </p>
          <p className="text-xl mb-8">
            Born in the heart of Texas, Jones' musical odyssey began at a tender age when he first encountered the allure of country melodies. Gifted a guitar at the age of nine, he embraced the artistry of legends like Roy Acuff and Bill Monroe, eventually honing his vocal style with influences from Hank Williams and Lefty Frizzell. Despite facing personal hardships and battling alcoholism, Jones' undying passion for music persevered, manifesting in timeless classics like "He Stopped Loving Her Today," a poignant testament to his profound artistry. A moniker bestowed upon him, "The Possum," charmingly reflected the distinctive shape of his nose and facial features. As the world lost this country's luminary in 2013, George Jones' legacy continues to resonate with unparalleled resonance, forever etched in the hearts of music aficionados worldwide.
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

export default GeorgeJones;