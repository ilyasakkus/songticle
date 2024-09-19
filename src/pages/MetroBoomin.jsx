import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft } from 'lucide-react';

const MetroBoomin = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800 mb-6">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Main Page
          </Link>
          <h1 className="text-4xl font-bold mb-4">Metro Boomin</h1>
          <p className="text-xl mb-8">
            Leland Tyler Wayne, professionally known as Metro Boomin, born on September 16, 1993, in St. Louis, Missouri, has become one of the most influential producers in modern hip-hop and trap music. Known for his distinctive sound, characterized by heavy bass, atmospheric synths, and crisp drums, Metro Boomin has shaped the sound of contemporary rap. His collaborations with numerous high-profile artists have resulted in multiple chart-topping hits and critically acclaimed tracks.
          </p>
          <h2 className="text-3xl font-semibold mb-6">Top 10 Songs</h2>
          <div className="space-y-8">
            {[
              {
                title: "Bad and Boujee",
                year: 2016,
                description: "This cultural phenomenon showcases Metro Boomin's ability to create an instantly recognizable beat. The track's minimalist production, featuring a haunting piano loop and crisp hi-hats, provides the perfect backdrop for Migos' and Lil Uzi Vert's catchy flows. The song's viral success, fueled by memorable lyrics and a hypnotic rhythm, helped solidify Metro Boomin's status as a hitmaker.",
                youtubeEmbed: "S-sJp1FfG7Q"
              },
              {
                title: "Mask Off",
                year: 2017,
                description: "\"Mask Off\" demonstrates Metro Boomin's skill in sampling and creating atmospheric beats. The track's iconic flute sample, taken from Tommy Butler's \"Prison Song,\" is layered over trap drums to create a mesmerizing soundscape. This unique blend of classical and contemporary elements, combined with Future's melodic flow, resulted in one of 2017's biggest hits and a defining moment in trap music.",
                youtubeEmbed: "xvZqHgFz51I"
              },
              {
                title: "Father Stretch My Hands Pt. 1",
                year: 2016,
                description: "While co-produced with Kanye West, this track bears Metro Boomin's distinct sonic fingerprint. The song's use of a pitched-up soul sample, combined with booming 808s and a gospel choir, creates a euphoric atmosphere that perfectly complements Kanye's vocals. The track's structure, with its dramatic beat drop, showcases Metro's ability to create dynamic, emotionally charged instrumentals.",
                youtubeEmbed: "_MIsk8VoNhM"
              },
              {
                title: "Jumpman",
                year: 2015,
                description: "This high-energy collaboration between Drake and Future features one of Metro Boomin's most infectious beats. The track's bouncy synth line, paired with hard-hitting drums and a catchy hook, created an instant club anthem. The song's success demonstrated Metro's ability to craft beats that work equally well on the radio and in live performances.",
                youtubeEmbed: "drprt4Dft7Y"
              },
              {
                title: "Tuesday",
                year: 2014,
                description: "\"Tuesday\" represents a departure from Metro Boomin's typical sound, showcasing his versatility as a producer. The track's dreamy, laid-back beat, featuring ethereal synths and a subtle bassline, creates a unique atmosphere that perfectly complements ILOVEMAKONNEN's unconventional vocals. The song's crossover success helped establish Metro as more than just a trap producer.",
                youtubeEmbed: "avFq9errZCk"
              },
              {
                title: "X",
                year: 2016,
                description: "This collaboration with 21 Savage exemplifies Metro Boomin's signature dark, atmospheric production style. The track's ominous piano melody, coupled with heavy 808s and skittering hi-hats, creates a tense, cinematic backdrop for 21 Savage and Future's verses. The song's menacing vibe and catchy hook made it a standout track on 21 Savage's breakthrough mixtape \"Savage Mode.\"",
                youtubeEmbed: "SpXw0qiy3Wo"
              },
              {
                title: "No Complaints",
                year: 2017,
                description: "On \"No Complaints,\" Metro Boomin steps into the spotlight as the lead artist. The track's smooth, R&B-influenced production demonstrates his ability to create more melodic, radio-friendly beats. The song's subtle use of vocal samples and a catchy flute melody, combined with verses from Offset and Drake, resulted in a summer hit that showcased Metro's growth as a producer.",
                youtubeEmbed: "WSHhp-VXTZs"
              },
              {
                title: "Congratulations",
                year: 2016,
                description: "While co-produced with Frank Dukes and Louis Bell, \"Congratulations\" bears Metro Boomin's influence in its trap-inspired drums and atmospheric synths. The track's uplifting vibe and memorable melody helped propel Post Malone to superstardom. This collaboration demonstrated Metro's ability to work within different styles and contribute to pop-crossover hits.",
                youtubeEmbed: "SC4xMk98Pdc"
              },
              {
                title: "Bank Account",
                year: 2017,
                description: "\"Bank Account\" features one of Metro Boomin's most minimalist yet effective beats. The track's simple piano loop and sparse percussion create a hypnotic backdrop for 21 Savage's deadpan delivery. The song's success proved that Metro could create chart-topping hits with even the most stripped-down production.",
                youtubeEmbed: "H1KBHFXm2Bg"
              },
              {
                title: "Overdue",
                year: 2018,
                description: "Closing our top 10 is this atmospheric track from Metro Boomin's debut studio album \"Not All Heroes Wear Capes.\" The song's dreamy production, featuring reverb-heavy guitars and subtle vocal samples, creates a spacey, psychedelic vibe that perfectly complements Travis Scott's auto-tuned vocals. \"Overdue\" showcases Metro's evolution as a producer and his ability to create more complex, layered soundscapes.",
                youtubeEmbed: "ThRbi74tkLw"
              }
            ].map((song, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-semibold mb-2">
                  {index + 1}. {song.title} ({song.year})
                </h3>
                <p className="text-gray-600 mb-4">{song.description}</p>
                <div className="aspect-w-16 aspect-h-9">
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

export default MetroBoomin;