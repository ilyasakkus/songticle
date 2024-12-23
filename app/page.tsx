import { singers, stories } from './data/sampleData';

export default function Home() {
  return (
    <main className="min-h-screen bg-base-200">
      <div className="navbar bg-base-100 shadow-lg">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">Songticle</a>
        </div>
        <div className="flex-none">
          <button className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Artists and Songs */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold mb-6">Featured Artists</h2>
            {singers.map((singer) => (
              <div key={singer.id} className="card bg-base-100 shadow-xl">
                <figure><img src={singer.image} alt={singer.name} className="w-full h-48 object-cover" /></figure>
                <div className="card-body">
                  <h3 className="card-title">{singer.name}</h3>
                  <div className="space-y-2">
                    {singer.songs.map((song) => (
                      <div key={song.id} className="flex justify-between items-center">
                        <span className="text-lg">{song.title}</span>
                        <span className="badge badge-primary">{song.year}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column - User Stories */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold mb-6">Song Stories</h2>
            {stories.map((story) => (
              <div key={story.id} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title">{story.songTitle}</h3>
                  <h4 className="text-sm text-base-content/70">by {story.artist}</h4>
                  <p className="py-4">{story.userStory}</p>
                  <div className="card-actions justify-between items-center">
                    <div className="text-sm text-base-content/70">
                      Shared by {story.userName}
                    </div>
                    <div className="badge badge-ghost">{story.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
