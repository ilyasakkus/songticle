'use client';

import { useState } from 'react';
import { ThemeSwitcher } from '../../components/ThemeSwitcher';
import { useStories } from '../../hooks/useSupabaseData';
import { StoryList } from '../../components/StoryList';

export default function HomePage() {
  const { stories, loading, error } = useStories();
  const [selectedTag, setSelectedTag] = useState('latest');

  return (
    <main className="min-h-screen bg-base-200 dark:bg-base-300">
      {/* Header */}
      <div className="navbar bg-base-100 dark:bg-base-300 shadow-lg px-4">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl gap-2 text-base-content dark:text-base-content">
            <span className="material-icons">music_note</span>
            Songticle
          </a>
        </div>
        <div className="flex-none gap-2">
          <ThemeSwitcher />
          <button className="btn btn-primary gap-2">
            <span className="material-icons">add_circle</span>
            Add Story
          </button>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="https://placehold.co/40x40" alt="profile" />
              </div>
            </label>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 dark:bg-base-300 rounded-box w-52">
              <li>
                <a className="gap-2 text-base-content dark:text-base-content">
                  <span className="material-icons">person</span>
                  Profile
                </a>
              </li>
              <li>
                <a className="gap-2 text-base-content dark:text-base-content" href="/admin">
                  <span className="material-icons">admin_panel_settings</span>
                  Admin
                </a>
              </li>
              <li>
                <a className="gap-2 text-base-content dark:text-base-content">
                  <span className="material-icons">settings</span>
                  Settings
                </a>
              </li>
              <li>
                <a className="gap-2 text-base-content dark:text-base-content">
                  <span className="material-icons">logout</span>
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-[240px] bg-base-100 dark:bg-base-300 min-h-[calc(100vh-64px)] border-r border-base-200 dark:border-base-300">
          <div className="p-4">
            <div className="flex flex-col space-y-2">
              <a className="flex items-center gap-2 text-primary dark:text-primary hover:bg-base-200 dark:hover:bg-base-300 p-2 rounded-lg">
                <span className="material-icons">forum</span>
                All Discussions
              </a>
              <a className="flex items-center gap-2 text-base-content dark:text-base-content hover:bg-base-200 dark:hover:bg-base-300 p-2 rounded-lg">
                <span className="material-icons">star</span>
                Following
              </a>
              <div className="divider my-2"></div>
            </div>
          </div>

          <div className="px-4">
            <h2 className="text-sm font-semibold mb-2 text-base-content/80 dark:text-base-content/80">TAGS</h2>
            <div className="space-y-1">
              <a className="flex items-center gap-2 text-sm hover:bg-base-200 dark:hover:bg-base-300 p-2 rounded-lg cursor-pointer text-base-content dark:text-base-content">
                <span className="material-icons text-base">local_offer</span>
                Pop
              </a>
              <a className="flex items-center gap-2 text-sm hover:bg-base-200 dark:hover:bg-base-300 p-2 rounded-lg cursor-pointer text-base-content dark:text-base-content">
                <span className="material-icons text-base">local_offer</span>
                Rock
              </a>
              <a className="flex items-center gap-2 text-sm hover:bg-base-200 dark:hover:bg-base-300 p-2 rounded-lg cursor-pointer text-base-content dark:text-base-content">
                <span className="material-icons text-base">local_offer</span>
                Hip Hop
              </a>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div className="join">
                <button 
                  className={`btn join-item ${selectedTag === 'latest' ? 'btn-active' : ''}`}
                  onClick={() => setSelectedTag('latest')}
                >
                  Latest
                </button>
                <button 
                  className={`btn join-item ${selectedTag === 'top' ? 'btn-active' : ''}`}
                  onClick={() => setSelectedTag('top')}
                >
                  Top
                </button>
                <button 
                  className={`btn join-item ${selectedTag === 'solved' ? 'btn-active' : ''}`}
                  onClick={() => setSelectedTag('solved')}
                >
                  Solved
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {loading ? (
                <div className="flex items-center justify-center p-12">
                  <span className="loading loading-spinner loading-lg"></span>
                </div>
              ) : error ? (
                <div className="alert alert-error">
                  <span className="material-icons">error</span>
                  {error}
                </div>
              ) : stories?.length === 0 ? (
                <div className="text-center p-12 text-base-content/60 dark:text-base-content/60">
                  <span className="material-icons text-6xl mb-4">forum</span>
                  <p className="text-xl">No stories yet</p>
                  <p className="text-sm">Be the first to share a story!</p>
                </div>
              ) : (
                <StoryList stories={stories} following={false} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
