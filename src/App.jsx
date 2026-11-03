import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  Flame, MessageSquare, Phone, User, Settings, 
  Image as ImageIcon, Radio, Heart, MessageCircle, Share2, 
  Volume2, Camera, Plus, Sparkles 
} from 'lucide-react';

export default function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [activeTab, setActiveTab] = useState('reels');
  const [subTab, setSubTab] = useState('reels');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Account kamyabi se ban gaya!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login ho gaya!");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = () => {
    signOut(auth);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0b0e14] text-white flex items-center justify-center p-4">
        <div className="bg-[#121824] p-8 rounded-2xl w-full max-w-md border border-gray-800 shadow-xl">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Flame className="w-8 h-8 text-pink-500" />
            <h1 className="text-2xl font-bold tracking-wider">GupShup</h1>
          </div>
          <h2 className="text-xl font-semibold mb-4 text-center">
            {isSignUp ? "Create a New Account" : "Welcome Back"}
          </h2>

          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#1a2233] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-pink-500"
                placeholder="alex@example.com"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#1a2233] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-pink-500"
                placeholder="••••••••"
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-2.5 rounded-lg hover:opacity-90 transition"
            >
              {isSignUp ? "Sign Up" : "Log In"}
            </button>
          </form>

          <div className="text-center mt-4">
            <button 
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-pink-400 hover:underline"
            >
              {isSignUp ? "Already have an account? Log In" : "Don't have an account? Sign Up"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-[#121824] border-r border-gray-800 p-4 flex flex-col justify-between hidden md:flex">
        <div>
          <div className="flex items-center space-x-2 mb-8 px-2">
            <Sparkles className="w-6 h-6 text-pink-500" />
            <h1 className="text-xl font-bold">GupShup</h1>
          </div>
          <nav className="space-y-2">
            <button 
              onClick={() => setActiveTab('reels')} 
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl transition ${activeTab === 'reels' ? 'bg-pink-500/20 text-pink-500 font-semibold' : 'text-gray-400 hover:bg-gray-800'}`}
            >
              <Flame className="w-5 h-5" />
              <span>Reels & Live</span>
            </button>
            <button 
              onClick={() => setActiveTab('chats')} 
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl transition ${activeTab === 'chats' ? 'bg-pink-500/20 text-pink-500 font-semibold' : 'text-gray-400 hover:bg-gray-800'}`}
            >
              <MessageSquare className="w-5 h-5" />
              <span>Chats</span>
            </button>
            <button 
              onClick={() => setActiveTab('calls')} 
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl transition ${activeTab === 'calls' ? 'bg-pink-500/20 text-pink-500 font-semibold' : 'text-gray-400 hover:bg-gray-800'}`}
            >
              <Phone className="w-5 h-5" />
              <span>Calls</span>
            </button>
            <button 
              onClick={() => setActiveTab('profile')} 
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl transition ${activeTab === 'profile' ? 'bg-pink-500/20 text-pink-500 font-semibold' : 'text-gray-400 hover:bg-gray-800'}`}
            >
              <User className="w-5 h-5" />
              <span>Profile</span>
            </button>
            <button 
              onClick={() => setActiveTab('settings')} 
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl transition ${activeTab === 'settings' ? 'bg-pink-500/20 text-pink-500 font-semibold' : 'text-gray-400 hover:bg-gray-800'}`}
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </nav>
        </div>

        {/* User Profile & Logout */}
        <div className="border-t border-gray-800 pt-4">
          <p className="text-xs text-gray-400 truncate mb-2 px-2">{user.email}</p>
          <button 
            onClick={handleLogout}
            className="w-full bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white py-2 rounded-lg transition text-sm font-semibold"
          >
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-start p-4 overflow-y-auto">
        {activeTab === 'reels' && (
          <div className="w-full max-w-sm flex flex-col items-center space-y-4">
            {/* Top Bar with Reels, Photos, Live & Go Live */}
            <div className="flex items-center justify-between w-full bg-[#121824] p-3 rounded-xl border border-gray-800">
              <div className="flex space-x-1.5">
                <button 
                  onClick={() => setSubTab('reels')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${subTab === 'reels' ? 'bg-pink-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                >
                  Reels
                </button>
                <button 
                  onClick={() => setSubTab('photos')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${subTab === 'photos' ? 'bg-pink-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                >
                  Photos
                </button>
                <button 
                  onClick={() => setSubTab('live')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${subTab === 'live' ? 'bg-pink-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                >
                  Live (3)
                </button>
              </div>

              <div className="flex items-center space-x-1.5">
                <button className="p-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-300 transition" title="Camera">
                  <Camera className="w-4 h-4" />
                </button>
                <button className="flex items-center space-x-1 px-2.5 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold transition">
                  <Radio className="w-3.5 h-3.5 animate-pulse" />
                  <span>Go Live</span>
                </button>
              </div>
            </div>

            {/* Reel Feed Content */}
            {subTab === 'reels' && (
              <div className="w-full bg-[#121824] rounded-2xl overflow-hidden border border-gray-800 shadow-2xl relative">
                <div className="p-4 flex justify-between items-center border-b border-gray-800">
                  <span className="bg-pink-500/20 text-pink-400 text-xs px-3 py-1 rounded-full font-semibold flex items-center space-x-1">
                    <Flame className="w-3.5 h-3.5" />
                    <span>Trending Tech</span>
                  </span>
                  <Volume2 className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white" />
                </div>
                
                <div className="h-[450px] bg-gradient-to-b from-indigo-950 to-gray-900 flex flex-col items-center justify-center relative p-4 text-center">
                  <Flame className="w-16 h-16 text-pink-500 mb-4 animate-pulse" />
                  <h2 className="font-bold text-lg text-gray-200">VERTICAL REEL STREAM #1</h2>
                  
                  {/* Floating Action Buttons */}
                  <div className="absolute right-4 bottom-16 flex flex-col items-center space-y-4">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gray-700 border border-white overflow-hidden flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-pink-500 rounded-full p-0.5">
                        <Plus className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <Heart className="w-7 h-7 text-white hover:text-pink-500 cursor-pointer transition" />
                      <span className="text-xs mt-1">42,100</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <MessageCircle className="w-7 h-7 text-white hover:text-pink-500 cursor-pointer transition" />
                      <span className="text-xs mt-1">1,420</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Share2 className="w-7 h-7 text-white hover:text-pink-500 cursor-pointer transition" />
                      <span className="text-xs mt-1">310</span>
                    </div>
                  </div>

                  {/* Reel Info */}
                  <div className="absolute bottom-4 left-4 text-left">
                    <h3 className="font-bold flex items-center space-x-2">
                      <span>@cyber_ninja</span> 
                      <span className="text-xs bg-purple-600 px-1.5 py-0.5 rounded text-white">Verified</span>
                    </h3>
                    <p className="text-xs text-gray-300 mt-1">Building modern UI tools with React and Tailwind CSS 🚀</p>
                  </div>
                </div>
              </div>
            )}

            {subTab === 'photos' && (
              <div className="w-full bg-[#121824] p-6 rounded-2xl border border-gray-800 text-center">
                <ImageIcon className="w-16 h-16 text-pink-500 mx-auto mb-4" />
                <h2 className="text-xl font-bold">Photos Feed</h2>
                <p className="text-gray-400 text-sm mt-2">Explore community photo streams and share your moments.</p>
              </div>
            )}

            {subTab === 'live' && (
              <div className="w-full bg-[#121824] p-6 rounded-2xl border border-gray-800 text-center">
                <Radio className="w-16 h-16 text-emerald-500 mx-auto mb-4 animate-pulse" />
                <h2 className="text-xl font-bold">Live Streams (3 Active)</h2>
                <p className="text-gray-400 text-sm mt-2">Join ongoing live broadcasts from creators now.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'chats' && (
          <div className="text-center mt-20">
            <MessageSquare className="w-16 h-16 text-pink-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold">Chats</h2>
            <p className="text-gray-400 mt-2">No messages yet. Start chatting with friends!</p>
          </div>
        )}

        {activeTab === 'calls' && (
          <div className="text-center mt-20">
            <Phone className="w-16 h-16 text-pink-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold">Calls</h2>
            <p className="text-gray-400 mt-2">No recent calls.</p>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="text-center mt-10 bg-[#121824] p-8 rounded-2xl border border-gray-800 max-w-md w-full">
            <div className="w-20 h-20 bg-pink-500/20 text-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              {user.email[0].toUpperCase()}
            </div>
            <h2 className="text-xl font-bold">{user.email}</h2>
            <p className="text-gray-400 text-sm mt-1">GupShup Verified User</p>
            <button onClick={handleLogout} className="mt-6 bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition">
              Log Out
            </button>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="text-center mt-20">
            <Settings className="w-16 h-16 text-pink-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold">Settings</h2>
            <p className="text-gray-400 mt-2">Manage your account preferences here.</p>
          </div>
        )}
      </main>
    </div>
  );
}
