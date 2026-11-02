import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, Video, Phone, User, Heart, Share2, Send, Smile, Paperclip, 
  Search, MoreVertical, LogOut, Camera, Mic, Radio, Plus, Settings, Sparkles, 
  CheckCheck, X, Image, FileText, UserPlus, Flame, Gift, Volume2, VolumeX, Eye,
  Play, Pause, Music, Bookmark, ChevronUp, ChevronDown, Check, Compass, Disc,
  Tv, Zap, ShieldCheck, Lock, EyeOff, Shield, Bell, Moon, Smartphone, HelpCircle,
  Upload, Layers
} from 'lucide-react';

// Main Application Component
export default function App() {
  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const [username, setUsername] = useState('Alex Rivera');
  const [email, setEmail] = useState('alex@example.com');
  const [password, setPassword] = useState('');

  // Navigation tab state
  const [activeTab, setActiveTab] = useState('reels'); // 'chats' | 'calls' | 'reels' | 'profile' | 'settings'
  const [reelsSubTab, setReelsSubTab] = useState('feed'); // 'feed' | 'photos' | 'live_grid'

  // Post Upload Modal State
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadType, setUploadType] = useState('image'); // 'image' | 'video'
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState('');
  const [postCaption, setPostCaption] = useState('');
  const fileInputRef = useRef(null);

  // Settings State
  const [settingsSection, setSettingsSection] = useState('main'); // 'main' | 'privacy' | 'security'
  const [privacySettings, setPrivacySettings] = useState({
    lastSeen: 'Everyone',
    profilePhoto: 'Everyone',
    about: 'Everyone',
    readReceipts: true,
    groupInvite: 'My Contacts'
  });
  const [securitySettings, setSecuritySettings] = useState({
    twoStepAuth: true,
    fingerprintLock: false,
    securityNotifications: true
  });

  // Active Live Room State
  const [activeLiveStream, setActiveLiveStream] = useState(null);
  // Live Channels / Streams Data List
  const [liveChannels, setLiveChannels] = useState([
    {
      id: 101,
      name: 'Alex Rivera (You)',
      user: '@alex_rivera',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      title: 'Coding the ultimate TikTok + WhatsApp React Hybrid App 🚀',
      viewers: 1420,
      category: 'Tech & Dev',
      previewBg: 'from-purple-900 via-slate-900 to-emerald-950'
    },
    {
      id: 102,
      name: 'Elena Rostova',
      user: '@elena_music',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
      title: 'Late Night Acoustic Guitar & Chill Covers 🎸🎶',
      viewers: 3890,
      category: 'Music',
      previewBg: 'from-pink-900 via-slate-900 to-rose-950'
    },
    {
      id: 103,
      name: 'Gamer Pro X',
      user: '@gamer_pro',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      title: 'Cyberpunk 2077 Max Graphics Tournament 🎮',
      viewers: 8910,
      category: 'Gaming',
      previewBg: 'from-cyan-900 via-slate-900 to-blue-950'
    }
  ]);

  const [reelsList, setReelsList] = useState([
    {
      id: 1,
      user: '@cyber_ninja',
      name: 'Cyber Ninja',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      desc: 'Building modern UI tools using React and Tailwind CSS 🚀 #coding #webdev #tech',
      music: 'Original Audio - Cyber Beats',
      likes: 42100,
      comments: 1420,
      shares: 310,
      isLiked: false,
      isBookmarked: false,
      isFollowing: false,
      bgGradient: 'from-indigo-900 via-slate-900 to-purple-950',
      tag: '🔥 Trending Tech'
    },
    {
      id: 2,
      user: '@sara_vibe',
      name: 'Sara Connor',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      desc: 'Sunset view from Tokyo skytower 🗼✨ Who wants to visit Tokyo next year?',
      music: 'Midnight City - Lofi Edit',
      likes: 89400,
      comments: 3290,
      shares: 1200,
      isLiked: true,
      isBookmarked: true,
      isFollowing: true,
      bgGradient: 'from-rose-900 via-slate-900 to-pink-950',
      tag: '✨ Travel Vibes'
    }
  ]);

  const [photosList, setPhotosList] = useState([
    {
      id: 1,
      user: '@cyber_ninja',
      name: 'Cyber Ninja',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600',
      desc: 'Urban architecture inspiration from Tokyo 🏙️ #photos #design',
      likes: 1240,
      comments: 98,
      isLiked: false,
      tag: '📸 Photo Feed'
    }
  ]);

  const [liveChatMessages, setLiveChatMessages] = useState([]);
  const [liveStreamCommentInput, setLiveStreamCommentInput] = useState('');
  const [giftNotification, setGiftNotification] = useState(null);

  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [giftsCount, setGiftsCount] = useState(148);
  const containerRef = useRef(null);

  // Chat Data State
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Sarah Jenkins', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', status: 'online', lastMsg: 'Hey! Did you check out the new TikTok feature?', time: '10:42 AM', unread: 2 },
    { id: 2, name: 'David Miller', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', status: 'offline', lastMsg: 'Call me when you are free.', time: 'Yesterday', unread: 0 },
    { id: 3, name: 'Tech Team Group', avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150', status: 'online', lastMsg: 'App deployment build is ready!', time: 'Yesterday', unread: 5 }
  ]);

  const [selectedChat, setSelectedChat] = useState(contacts[0]);
  const [chatMessages, setChatMessages] = useState({
    1: [
      { id: 101, sender: 'them', text: 'Hey there! How is the new app build going?', time: '10:40 AM' },
      { id: 102, sender: 'me', text: 'It is going great! Combined WhatsApp chats with TikTok live streams.', time: '10:41 AM' },
      { id: 103, sender: 'them', text: 'Hey! Did you check out the new TikTok feature?', time: '10:42 AM' }
    ],
    2: [
      { id: 201, sender: 'them', text: 'Call me when you are free.', time: 'Yesterday' }
    ],
    3: [
      { id: 301, sender: 'them', text: 'App deployment build is ready!', time: 'Yesterday' }
    ]
  });

  const [messageInput, setMessageInput] = useState('');
  const [activeCallModal, setActiveCallModal] = useState(null); // null | 'voice' | 'video'
  const [isBroadcasting, setIsBroadcasting] = useState(false);

  // Handle Login/Signup submission
  const handleAuth = (e) => {
    e.preventDefault();
    if (email && password) {
      setIsLoggedIn(true);
    }
  };

  // Chat message send handler
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim() || !selectedChat) return;

    const newMsg = {
      id: Date.now(),
      sender: 'me',
      text: messageInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => ({
      ...prev,
      [selectedChat.id]: [...(prev[selectedChat.id] || []), newMsg]
    }));

    setContacts(prev => prev.map(c => c.id === selectedChat.id ? { ...c, lastMsg: messageInput, time: 'Just now' } : c));
    setMessageInput('');
  };

  // Local File Select Handler
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setFilePreviewUrl(url);
      if (file.type.startsWith('video')) {
        setUploadType('video');
      } else {
        setUploadType('image');
      }
    }
  };

  // Submit New Post Handler
  const handlePublishPost = (e) => {
    e.preventDefault();
    if (!filePreviewUrl && !postCaption) return;

    if (uploadType === 'image') {
      const newPhoto = {
        id: Date.now(),
        user: `@${username.toLowerCase().replace(/\s+/g, '_')}`,
        name: username,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        imageUrl: filePreviewUrl || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600',
        desc: postCaption || 'New uploaded photo post ✨',
        likes: 1,
        comments: 0,
        isLiked: true,
        tag: '📸 User Upload'
      };
      setPhotosList(prev => [newPhoto, ...prev]);
      setReelsSubTab('photos');
    } else {
      const newReel = {
        id: Date.now(),
        user: `@${username.toLowerCase().replace(/\s+/g, '_')}`,
        name: username,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        desc: postCaption || 'New uploaded video reel 🚀',
        music: 'Original Audio - User Music',
        likes: 1,
        comments: 0,
        shares: 0,
        isLiked: true,
        isBookmarked: false,
        isFollowing: false,
        bgGradient: 'from-emerald-950 via-slate-900 to-teal-950',
        tag: '🎥 User Reel'
      };
      setReelsList(prev => [newReel, ...prev]);
      setReelsSubTab('feed');
    }

    // Reset upload modal states
    setIsUploadModalOpen(false);
    setSelectedFile(null);
    setFilePreviewUrl('');
    setPostCaption('');
  };

  // Scroll to targeted reel index
  const scrollToReel = (index) => {
    if (index >= 0 && index < reelsList.length) {
      setActiveReelIndex(index);
    }
  };

  // Toggle Like on Reel
  const handleToggleLike = (id) => {
    setReelsList(prev => prev.map(reel => {
      if (reel.id === id) {
        return {
          ...reel,
          isLiked: !reel.isLiked,
          likes: reel.isLiked ? reel.likes - 1 : reel.likes + 1
        };
      }
      return reel;
    }));
  };

  // Simulated Real-time Live Comments generator when inside Live Room
  useEffect(() => {
    if (!activeLiveStream) return;

    setLiveChatMessages([
      { id: 1, user: 'cyber_fan', text: 'Hey guys! Super excited for this live! 🔥' },
      { id: 2, user: 'dev_guru', text: 'Great quality stream 👌' },
      { id: 3, user: 'sam_x', text: 'Greetings from Pakistan! 🇵🇰' }
    ]);

    const randomComments = [
      'Sending love ❤️❤️❤️',
      'This app design is incredible!',
      'Show us your setup please! 💻',
      'Rose sent! 🌹',
      'Love from London 🇬🇧',
      'Can you explain the code again?',
      'Awesome stream bro!!'
    ];
    const randomUsers = ['mira_99', 'tech_guy', 'lucas_art', 'zara_vibe', 'nomi_dev'];

    const interval = setInterval(() => {
      const newComment = {
        id: Date.now(),
        user: randomUsers[Math.floor(Math.random() * randomUsers.length)],
        text: randomComments[Math.floor(Math.random() * randomComments.length)]
      };
      setLiveChatMessages(prev => [...prev.slice(-15), newComment]);
    }, 2500);

    return () => clearInterval(interval);
  }, [activeLiveStream]);

  // Send Gift Handler
  const handleSendGift = (giftName, giftEmoji) => {
    setGiftsCount(prev => prev + 1);
    setGiftNotification({ name: giftName, emoji: giftEmoji });

    if (activeLiveStream) {
      setLiveChatMessages(prev => [
        ...prev,
        { id: Date.now(), user: username.toLowerCase().replace(/\s+/g, '_'), text: `sent ${giftEmoji} ${giftName}!`, isGift: true }
      ]);
    }

    setTimeout(() => {
      setGiftNotification(null);
    }, 2000);
  };

  // Send comment in live room
  const handleSendLiveComment = (e) => {
    e.preventDefault();
    if (!liveStreamCommentInput.trim()) return;

    setLiveChatMessages(prev => [
      ...prev,
      { id: Date.now(), user: username.toLowerCase().replace(/\s+/g, '_'), text: liveStreamCommentInput }
    ]);
    setLiveStreamCommentInput('');
  };

  // Keyboard navigation for reels feed
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeTab === 'reels' && reelsSubTab === 'feed' && !activeLiveStream) {
        if (e.key === 'ArrowDown') scrollToReel(activeReelIndex + 1);
        if (e.key === 'ArrowUp') scrollToReel(activeReelIndex - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeReelIndex, activeTab, reelsSubTab, activeLiveStream]);

  // ---------------- LOGIN / SIGNUP SCREEN ----------------
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 relative overflow-hidden font-sans">
        {/* Glowing Background FX */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-tr from-emerald-400 via-teal-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg mb-3">
              <MessageSquare className="w-8 h-8 text-slate-950" />
            </div>
            <h1 className="text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-pink-500">
              GupShup
            </h1>
            <p className="text-xs text-slate-400 mt-1">Chat, Reels & Live Streaming Platform</p>
          </div>

          <div className="flex bg-slate-950 p-1 rounded-xl mb-6 border border-slate-800">
            <button
              onClick={() => setAuthMode('login')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                authMode === 'login' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => setAuthMode('signup')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                authMode === 'signup' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            {authMode === 'signup' && (
              <div>
                <label className="text-xs font-semibold text-slate-400 mb-1 block">Full Name</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                  required
                />
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-slate-400 mb-1 block">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 mb-1 block">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-slate-950 font-bold py-3 px-4 rounded-xl shadow-lg shadow-emerald-500/20 active:scale-[0.99] transition-all text-sm flex items-center justify-center gap-2"
            >
              {authMode === 'login' ? 'Continue to App' : 'Create Free Account'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Current Active Reel Item
  const activeReel = reelsList[activeReelIndex];

  // ---------------- MAIN APP INTERFACE ----------------
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans h-screen overflow-hidden">
      
      {/* ==================== MAIN NAVIGATION SIDEBAR / BOTTOM BAR ==================== */}
      <nav className="w-full md:w-20 bg-slate-900 border-t md:border-t-0 md:border-r border-slate-800 flex md:flex-col justify-between items-center p-3 z-40 order-2 md:order-1">
        <div className="hidden md:flex flex-col items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-tr from-emerald-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
            <Sparkles className="w-5 h-5 text-slate-950" />
          </div>
        </div>

        <div className="flex md:flex-col justify-around w-full md:w-auto gap-1 md:gap-6">
          <button
            onClick={() => setActiveTab('reels')}
            className={`flex flex-col items-center justify-center p-2.5 rounded-2xl transition-all relative ${
              activeTab === 'reels' ? 'bg-pink-500/10 text-pink-500' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Flame className="w-6 h-6" />
            <span className="text-[10px] font-bold mt-1">Reels & Live</span>
          </button>

          <button
            onClick={() => setActiveTab('chats')}
            className={`flex flex-col items-center justify-center p-2.5 rounded-2xl transition-all relative ${
              activeTab === 'chats' ? 'bg-emerald-500/10 text-emerald-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageSquare className="w-6 h-6" />
            <span className="text-[10px] font-bold mt-1">Chats</span>
            <span className="absolute top-1 right-2 w-2 h-2 bg-emerald-400 rounded-full" />
          </button>

          <button
            onClick={() => setActiveTab('calls')}
            className={`flex flex-col items-center justify-center p-2.5 rounded-2xl transition-all ${
              activeTab === 'calls' ? 'bg-emerald-500/10 text-emerald-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Phone className="w-6 h-6" />
            <span className="text-[10px] font-bold mt-1">Calls</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center justify-center p-2.5 rounded-2xl transition-all ${
              activeTab === 'profile' ? 'bg-emerald-500/10 text-emerald-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-6 h-6" />
            <span className="text-[10px] font-bold mt-1">Profile</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('settings');
              setSettingsSection('main');
            }}
            className={`flex flex-col items-center justify-center p-2.5 rounded-2xl transition-all ${
              activeTab === 'settings' ? 'bg-emerald-500/10 text-emerald-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Settings className="w-6 h-6" />
            <span className="text-[10px] font-bold mt-1">Settings</span>
          </button>
        </div>

        <div className="hidden md:flex flex-col items-center gap-4">
          <button
            onClick={() => setIsLoggedIn(false)}
            title="Log Out"
            className="p-2.5 text-slate-400 hover:text-rose-400 rounded-xl hover:bg-slate-800 transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* ==================== MAIN CONTENT DISPLAY AREA ==================== */}
      <main className="flex-1 flex overflow-hidden order-1 md:order-2">

        {/* ---------------- TIKTOK REELS & LIVE DISCOVERY TAB ---------------- */}
        {activeTab === 'reels' && (
          <div className="flex-1 flex flex-col items-center bg-slate-950 relative overflow-hidden">
            {/* Reels Header Navigation Bar */}
            <div className="w-full max-w-md flex items-center justify-between p-3 bg-slate-900/80 backdrop-blur-md z-30 border-b border-slate-800">
              <div className="flex gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 overflow-x-auto">
                <button
                  onClick={() => setReelsSubTab('feed')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    reelsSubTab === 'feed' ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5" /> Reels
                </button>
                <button
                  onClick={() => setReelsSubTab('photos')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    reelsSubTab === 'photos' ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Image className="w-3.5 h-3.5" /> Photos
                </button>
                <button
                  onClick={() => setReelsSubTab('live_grid')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    reelsSubTab === 'live_grid' ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Radio className="w-3.5 h-3.5 text-rose-400 animate-pulse" /> Live ({liveChannels.length})
                </button>
              </div>

              <div className="flex items-center gap-2">
                {/* Camera / Upload Button */}
                <button
                  onClick={() => setIsUploadModalOpen(true)}
                  title="Create Post / Upload File"
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-pink-400 rounded-xl border border-slate-700 transition-all hover:scale-105 active:scale-95"
                >
                  <Camera className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsBroadcasting(true)}
                  className="flex items-center gap-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 px-3 py-1.5 rounded-xl text-xs font-bold shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all"
                >
                  <Radio className="w-3.5 h-3.5" /> Go Live
                </button>
              </div>
            </div>

            {/* SUB TAB 1: PHOTOS FEED */}
            {reelsSubTab === 'photos' && (
              <div className="w-full max-w-md flex-1 overflow-y-auto p-4 space-y-6">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                    <Image className="w-4 h-4 text-pink-500" /> Photo Posts Feed
                  </h3>
                  <button 
                    onClick={() => setIsUploadModalOpen(true)}
                    className="text-xs text-pink-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <Plus className="w-3.5 h-3.5" /> Upload Photo
                  </button>
                </div>

                {photosList.map(photo => (
                  <div key={photo.id} className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
                    <div className="p-3.5 flex items-center justify-between border-b border-slate-800/80">
                      <div className="flex items-center gap-3">
                        <img src={photo.avatar} alt={photo.name} className="w-9 h-9 rounded-full object-cover border border-pink-500" />
                        <div>
                          <h4 className="font-bold text-white text-xs">{photo.name}</h4>
                          <p className="text-[10px] text-pink-300">{photo.user}</p>
                        </div>
                      </div>
                      <span className="text-[10px] bg-slate-800 text-slate-400 px-2.5 py-1 rounded-full border border-slate-700">
                        {photo.tag}
                      </span>
                    </div>

                    <div className="relative bg-slate-950">
                      <img src={photo.imageUrl} alt={photo.desc} className="w-full max-h-[420px] object-cover" />
                    </div>

                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => {
                              setPhotosList(prev => prev.map(p => p.id === photo.id ? { ...p, isLiked: !p.isLiked, likes: p.isLiked ? p.likes - 1 : p.likes + 1 } : p));
                            }}
                            className="flex items-center gap-1.5 text-xs font-bold text-slate-200"
                          >
                            <Heart className={`w-5 h-5 ${photo.isLiked ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
                            {photo.likes.toLocaleString()}
                          </button>

                          <button className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
                            <MessageSquare className="w-5 h-5 text-slate-400" />
                            {photo.comments.toLocaleString()}
                          </button>
                        </div>

                        <button className="text-slate-400 hover:text-white">
                          <Share2 className="w-5 h-5" />
                        </button>
                      </div>

                      <p className="text-xs text-slate-300 font-normal leading-relaxed">
                        <span className="font-bold text-white mr-1.5">{photo.user}</span>
                        {photo.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* SUB TAB 2: LIVE CHANNELS GRID DISCOVERY */}
            {reelsSubTab === 'live_grid' && (
              <div className="w-full max-w-md flex-1 overflow-y-auto p-4 space-y-4">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                    <Radio className="w-4 h-4 text-rose-500 animate-pulse" /> Top Active Live Streams
                  </h3>
                  <span className="text-[11px] text-slate-400">Click to enter stream</span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {liveChannels.map(channel => (
                    <div
                      key={channel.id}
                      onClick={() => setActiveLiveStream(channel)}
                      className="group relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden cursor-pointer hover:border-pink-500/50 transition-all shadow-xl"
                    >
                      {/* Channel Cover Banner */}
                      <div className={`h-40 bg-gradient-to-tr ${channel.previewBg} p-4 flex flex-col justify-between relative`}>
                        <div className="flex justify-between items-start z-10">
                          <span className="bg-rose-600/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 animate-pulse">
                            <Radio className="w-3 h-3" /> LIVE
                          </span>
                          <span className="bg-black/60 backdrop-blur-md text-slate-200 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/10">
                            <Eye className="w-3 h-3 text-emerald-400" /> {channel.viewers.toLocaleString()} watching
                          </span>
                        </div>

                        <div className="flex items-center gap-3 z-10">
                          <img src={channel.avatar} alt={channel.name} className="w-10 h-10 rounded-full border-2 border-pink-500 object-cover shadow-lg" />
                          <div>
                            <h4 className="font-bold text-white text-sm drop-shadow">{channel.name}</h4>
                            <p className="text-[11px] text-pink-300 font-medium">{channel.user}</p>
                          </div>
                        </div>
                      </div>

                      {/* Channel Title Footer */}
                      <div className="p-3 bg-slate-900 flex justify-between items-center">
                        <p className="text-xs text-slate-200 font-medium truncate flex-1 pr-2">
                          {channel.title}
                        </p>
                        <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full border border-slate-700">
                          {channel.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SUB TAB 3: VERTICAL REELS SCROLL FEED */}
            {reelsSubTab === 'feed' && (
              <div 
                ref={containerRef}
                onWheel={(e) => {
                  if (e.deltaY > 50) scrollToReel(activeReelIndex + 1);
                  else if (e.deltaY < -50) scrollToReel(activeReelIndex - 1);
                }}
                className="w-full max-w-md h-full md:h-[95%] md:max-h-[820px] bg-slate-900 border-0 md:border-4 md:border-slate-800 relative overflow-hidden flex flex-col justify-between shadow-2xl"
              >
                {/* Simulated Full-screen Reel Video Background */}
                <div className={`absolute inset-0 bg-gradient-to-b ${activeReel.bgGradient} flex items-center justify-center pointer-events-none transition-colors duration-500`}>
                  <div className="text-center p-6 opacity-30">
                    <Flame className="w-24 h-24 mx-auto mb-2 text-pink-500 animate-pulse" />
                    <span className="text-xs font-mono uppercase tracking-widest text-slate-300">Vertical Reel Stream #{activeReel.id}</span>
                  </div>
                </div>

                {/* Floating Top Reel Info Tag */}
                <div className="relative z-20 p-4 flex justify-between items-center">
                  <span className="bg-black/40 backdrop-blur-md border border-white/10 text-slate-200 text-xs px-3 py-1 rounded-full font-medium">
                    {activeReel.tag}
                  </span>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setIsMuted(!isMuted)} 
                      className="p-2 bg-black/40 backdrop-blur-md rounded-full text-white border border-white/10 hover:bg-black/60 transition-colors"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Right Floating Interactive Action Bar */}
                <div className="absolute right-4 bottom-24 z-20 flex flex-col items-center gap-5">
                  <div className="relative">
                    <img src={activeReel.avatar} className="w-12 h-12 rounded-full border-2 border-pink-500 object-cover shadow-lg" />
                    <button className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-pink-500 text-white p-0.5 rounded-full">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <button 
                    onClick={() => handleToggleLike(activeReel.id)}
                    className="flex flex-col items-center group"
                  >
                    <div className={`p-3 rounded-full backdrop-blur-md border transition-all ${
                      activeReel.isLiked ? 'bg-rose-500/20 border-rose-500 text-rose-500 scale-110' : 'bg-black/40 border-white/10 text-white'
                    }`}>
                      <Heart className={`w-6 h-6 ${activeReel.isLiked ? 'fill-rose-500' : ''}`} />
                    </div>
                    <span className="text-[11px] font-bold text-slate-200 mt-1">{activeReel.likes.toLocaleString()}</span>
                  </button>

                  <button className="flex flex-col items-center">
                    <div className="p-3 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-white">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-200 mt-1">{activeReel.comments.toLocaleString()}</span>
                  </button>

                  <button className="flex flex-col items-center">
                    <div className="p-3 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-white">
                      <Share2 className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-200 mt-1">{activeReel.shares.toLocaleString()}</span>
                  </button>

                  {/* Music Disc Animation */}
                  <div className="w-9 h-9 rounded-full bg-slate-950 border-2 border-slate-700 flex items-center justify-center animate-spin mt-2">
                    <Disc className="w-5 h-5 text-pink-400" />
                  </div>
                </div>

                {/* Bottom Overlay Info & Controls */}
                <div className="relative z-20 p-5 bg-gradient-to-t from-black/90 via-black/40 to-transparent pt-12 flex flex-col justify-end">
                  <div className="max-w-[75%] space-y-2">
                    <h3 className="font-black text-white text-base flex items-center gap-2 drop-shadow">
                      {activeReel.user}
                      <span className="bg-pink-500/20 text-pink-400 text-[10px] px-2 py-0.5 rounded-full border border-pink-500/30">Verified</span>
                    </h3>
                    <p className="text-xs text-slate-200 font-normal leading-relaxed line-clamp-2 drop-shadow">
                      {activeReel.desc}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-pink-300 font-semibold">
                      <Music className="w-3.5 h-3.5 animate-pulse" />
                      <span className="truncate">{activeReel.music}</span>
                    </div>
                  </div>

                  {/* Vertical Scroll Navigation Arrows */}
                  <div className="flex justify-between items-center mt-4 pt-3 border-t border-white/10">
                    <span className="text-[10px] text-slate-400 font-mono">Reel {activeReelIndex + 1} of {reelsList.length}</span>
                    <div className="flex gap-2">
                      <button 
                        disabled={activeReelIndex === 0}
                        onClick={() => scrollToReel(activeReelIndex - 1)}
                        className="p-1.5 bg-black/50 border border-white/10 rounded-lg text-white disabled:opacity-30"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      <button 
                        disabled={activeReelIndex === reelsList.length - 1}
                        onClick={() => scrollToReel(activeReelIndex + 1)}
                        className="p-1.5 bg-black/50 border border-white/10 rounded-lg text-white disabled:opacity-30"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ---------------- CHATS TAB ---------------- */}
        {activeTab === 'chats' && (
          <div className="flex-1 flex w-full">
            {/* Contacts Sidebar */}
            <div className="w-full md:w-80 bg-slate-900 border-r border-slate-800 flex flex-col">
              <div className="p-4 border-b border-slate-800">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-emerald-400" /> Chats
                  </h2>
                  <button className="p-2 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search or start new chat..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto divide-y divide-slate-800/50">
                {contacts.map(contact => (
                  <div
                    key={contact.id}
                    onClick={() => setSelectedChat(contact)}
                    className={`p-3.5 flex items-center gap-3 cursor-pointer transition-colors ${
                      selectedChat?.id === contact.id ? 'bg-slate-800/80 border-l-4 border-emerald-400' : 'hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="relative">
                      <img src={contact.avatar} alt={contact.name} className="w-12 h-12 rounded-full object-cover" />
                      {contact.status === 'online' && (
                        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-900 rounded-full" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="text-xs font-bold text-white truncate">{contact.name}</h4>
                        <span className="text-[10px] text-slate-400">{contact.time}</span>
                      </div>
                      <p className="text-xs text-slate-400 truncate">{contact.lastMsg}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Active Chat Window */}
            {selectedChat ? (
              <div className="hidden md:flex flex-1 flex-col bg-slate-950">
                {/* Chat Top Bar */}
                <div className="p-3.5 bg-slate-900 border-b border-slate-800 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <img src={selectedChat.avatar} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <h3 className="text-sm font-bold text-white">{selectedChat.name}</h3>
                      <span className="text-[11px] text-emerald-400 font-medium">● Active Now</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setActiveCallModal('voice')} 
                      className="p-2.5 hover:bg-slate-800 rounded-xl text-slate-300 hover:text-emerald-400"
                    >
                      <Phone className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => setActiveCallModal('video')} 
                      className="p-2.5 hover:bg-slate-800 rounded-xl text-slate-300 hover:text-emerald-400"
                    >
                      <Video className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {(chatMessages[selectedChat.id] || []).map(msg => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-md rounded-2xl px-4 py-2.5 text-xs shadow-md ${
                          msg.sender === 'me'
                            ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-br-none'
                            : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none'
                        }`}
                      >
                        <p className="leading-relaxed">{msg.text}</p>
                        <span className="text-[9px] opacity-70 block text-right mt-1 font-mono">{msg.time}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input Bar */}
                <form onSubmit={handleSendMessage} className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
                  <button type="button" className="p-2 text-slate-400 hover:text-white">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                  <button type="submit" className="p-2.5 bg-emerald-500 text-slate-950 rounded-xl font-bold hover:bg-emerald-400">
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-500">
                <MessageSquare className="w-12 h-12 mb-2" />
                <p>Select a chat to start conversation</p>
              </div>
            )}
          </div>
        )}

        {/* ---------------- CALLS LOG TAB ---------------- */}
        {activeTab === 'calls' && (
          <div className="flex-1 bg-slate-950 p-6 overflow-y-auto max-w-2xl mx-auto w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Phone className="w-6 h-6 text-emerald-400" /> Recent Calls
              </h2>
              <span className="text-xs bg-emerald-500/10 text-emerald-400 font-semibold px-3 py-1 rounded-full border border-emerald-500/20">
                Audio & Video Enabled
              </span>
            </div>
            <div className="space-y-3">
              {[
                { id: 1, name: 'Sarah Jenkins', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', type: 'Incoming Video Call', time: 'Today, 2:30 PM', callType: 'video', color: 'text-emerald-400' },
                { id: 2, name: 'David Miller', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', type: 'Outgoing Voice Call', time: 'Yesterday, 6:15 PM', callType: 'voice', color: 'text-emerald-400' },
                { id: 3, name: 'Sophia Chen', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150', type: 'Missed Video Call', time: 'Oct 28, 11:00 AM', callType: 'video', color: 'text-rose-400' }
              ].map((call) => {
                const CallIcon = call.callType === 'video' ? Video : Phone;
                return (
                  <div key={call.id} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex justify-between items-center hover:border-slate-700 transition-colors">
                    <div className="flex items-center gap-3">
                      <img src={call.avatar} alt={call.name} className="w-11 h-11 rounded-full object-cover border border-slate-700" />
                      <div>
                        <h4 className="font-bold text-sm text-white">{call.name}</h4>
                        <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                          <CallIcon className={`w-3.5 h-3.5 ${call.color}`} /> {call.type} • {call.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* Audio Call Trigger */}
                      <button 
                        onClick={() => {
                          setSelectedChat({ name: call.name, avatar: call.avatar });
                          setActiveCallModal('voice');
                        }}
                        title="Start Voice Call"
                        className="p-2.5 bg-slate-800 text-slate-300 hover:bg-emerald-500 hover:text-slate-950 rounded-xl transition-all"
                      >
                        <Phone className="w-4 h-4" />
                      </button>
                      {/* Video Call Trigger */}
                      <button 
                        onClick={() => {
                          setSelectedChat({ name: call.name, avatar: call.avatar });
                          setActiveCallModal('video');
                        }}
                        title="Start Video Call"
                        className="p-2.5 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 rounded-xl transition-all border border-emerald-500/20"
                      >
                        <Video className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ---------------- PROFILE TAB ---------------- */}
        {activeTab === 'profile' && (
          <div className="flex-1 bg-slate-950 p-6 overflow-y-auto max-w-lg mx-auto w-full">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-center shadow-xl">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
                  className="w-full h-full rounded-full border-4 border-emerald-400 object-cover"
                />
                <button className="absolute bottom-0 right-0 bg-pink-500 p-2 rounded-full text-white shadow-lg">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <h2 className="text-xl font-bold text-white">{username}</h2>
              <p className="text-xs text-slate-400 mt-0.5">{email}</p>

              <div className="grid grid-cols-3 gap-3 my-6 bg-slate-950 p-3 rounded-2xl border border-slate-800">
                <div>
                  <span className="block font-bold text-emerald-400 text-lg">1.2k</span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Friends</span>
                </div>
                <div>
                  <span className="block font-bold text-pink-400 text-lg">45.8k</span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Followers</span>
                </div>
                <div>
                  <span className="block font-bold text-amber-400 text-lg">890k</span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Likes</span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => {
                    setActiveTab('settings');
                    setSettingsSection('privacy');
                  }}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-3 rounded-xl transition-all text-xs border border-slate-700 flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4 text-emerald-400" /> Privacy & Security Settings
                </button>
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="w-full bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white font-bold py-3 rounded-xl transition-all text-xs border border-rose-500/20"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- SETTINGS TAB ---------------- */}
        {activeTab === 'settings' && (
          <div className="flex-1 bg-slate-950 p-6 overflow-y-auto max-w-xl mx-auto w-full">
            <div className="flex items-center gap-3 mb-6">
              {settingsSection !== 'main' && (
                <button 
                  onClick={() => setSettingsSection('main')}
                  className="p-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Settings className="w-6 h-6 text-emerald-400" /> 
                {settingsSection === 'main' && 'Settings'}
                {settingsSection === 'privacy' && 'Privacy Settings'}
                {settingsSection === 'security' && 'Account Security'}
              </h2>
            </div>

            {/* MAIN SETTINGS MENU */}
            {settingsSection === 'main' && (
              <div className="space-y-3">
                <div 
                  onClick={() => setSettingsSection('privacy')}
                  className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center justify-between cursor-pointer hover:border-emerald-500/50 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
                      <Lock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">Privacy</h4>
                      <p className="text-xs text-slate-400">Last seen, profile photo, read receipts, blocked users</p>
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-500 -rotate-90" />
                </div>

                <div 
                  onClick={() => setSettingsSection('security')}
                  className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center justify-between cursor-pointer hover:border-emerald-500/50 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-pink-500/10 text-pink-400 rounded-xl border border-pink-500/20">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">Account Security</h4>
                      <p className="text-xs text-slate-400">Two-step verification, fingerprint lock, security alerts</p>
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-500 -rotate-90" />
                </div>

                <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
                      <Bell className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">Notifications</h4>
                      <p className="text-xs text-slate-400">Message tones, group alerts, live stream updates</p>
                    </div>
                  </div>
                  <input type="checkbox" defaultChecked className="toggle accent-emerald-500 w-4 h-4" />
                </div>

                <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
                      <Moon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">Appearance</h4>
                      <p className="text-xs text-slate-400">Dark Theme (Default)</p>
                    </div>
                  </div>
                  <span className="text-xs bg-slate-800 px-3 py-1 rounded-full text-slate-300 border border-slate-700">Dark</span>
                </div>
              </div>
            )}

            {/* PRIVACY SETTINGS SUB-PAGE */}
            {settingsSection === 'privacy' && (
              <div className="space-y-4">
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-sm text-white">Last Seen & Online</h4>
                      <p className="text-xs text-slate-400">Control who sees when you are active</p>
                    </div>
                    <select 
                      value={privacySettings.lastSeen}
                      onChange={(e) => setPrivacySettings(p => ({ ...p, lastSeen: e.target.value }))}
                      className="bg-slate-950 border border-slate-800 text-xs text-emerald-400 rounded-xl px-3 py-2 font-bold focus:outline-none"
                    >
                      <option value="Everyone">Everyone</option>
                      <option value="My Contacts">My Contacts</option>
                      <option value="Nobody">Nobody</option>
                    </select>
                  </div>

                  <div className="border-t border-slate-800 pt-3 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-sm text-white">Profile Photo Privacy</h4>
                      <p className="text-xs text-slate-400">Who can see your profile picture</p>
                    </div>
                    <select 
                      value={privacySettings.profilePhoto}
                      onChange={(e) => setPrivacySettings(p => ({ ...p, profilePhoto: e.target.value }))}
                      className="bg-slate-950 border border-slate-800 text-xs text-emerald-400 rounded-xl px-3 py-2 font-bold focus:outline-none"
                    >
                      <option value="Everyone">Everyone</option>
                      <option value="My Contacts">My Contacts</option>
                      <option value="Nobody">Nobody</option>
                    </select>
                  </div>

                  <div className="border-t border-slate-800 pt-3 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-sm text-white">Read Receipts (Blue Ticks)</h4>
                      <p className="text-xs text-slate-400">If turned off, you won't send or receive Read Receipts</p>
                    </div>
                    <button 
                      onClick={() => setPrivacySettings(p => ({ ...p, readReceipts: !p.readReceipts }))}
                      className={`w-11 h-6 rounded-full transition-colors relative p-1 ${
                        privacySettings.readReceipts ? 'bg-emerald-500' : 'bg-slate-800'
                      }`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                        privacySettings.readReceipts ? 'translate-x-5' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-sm text-white">Blocked Contacts</h4>
                    <p className="text-xs text-slate-400">0 accounts blocked</p>
                  </div>
                  <span className="text-xs text-slate-400">Manage</span>
                </div>
              </div>
            )}

            {/* SECURITY SETTINGS SUB-PAGE */}
            {settingsSection === 'security' && (
              <div className="space-y-4">
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-sm text-white">Two-Step Verification</h4>
                      <p className="text-xs text-slate-400">Require PIN when registering phone number again</p>
                    </div>
                    <button 
                      onClick={() => setSecuritySettings(s => ({ ...s, twoStepAuth: !s.twoStepAuth }))}
                      className={`w-11 h-6 rounded-full transition-colors relative p-1 ${
                        securitySettings.twoStepAuth ? 'bg-emerald-500' : 'bg-slate-800'
                      }`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                        securitySettings.twoStepAuth ? 'translate-x-5' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>

                  <div className="border-t border-slate-800 pt-3 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-sm text-white">App Fingerprint / Face ID Lock</h4>
                      <p className="text-xs text-slate-400">Unlock app with biometric sensor</p>
                    </div>
                    <button 
                      onClick={() => setSecuritySettings(s => ({ ...s, fingerprintLock: !s.fingerprintLock }))}
                      className={`w-11 h-6 rounded-full transition-colors relative p-1 ${
                        securitySettings.fingerprintLock ? 'bg-emerald-500' : 'bg-slate-800'
                      }`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                        securitySettings.fingerprintLock ? 'translate-x-5' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* ==================== FULL SCREEN LIVE STREAM ROOM VIEWER MODAL ==================== */}
      {activeLiveStream && (
        <div className="fixed inset-0 z-50 bg-slate-950 flex justify-center items-center">
          <div className="w-full max-w-md h-full bg-slate-950 relative overflow-hidden flex flex-col justify-between">
            {/* Gift Sending Pop-up Animation */}
            {giftNotification && (
              <div className="absolute top-24 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 px-6 py-2 rounded-full font-black text-sm flex items-center gap-2 shadow-2xl shadow-amber-500/50 animate-bounce">
                <span className="text-2xl">{giftNotification.emoji}</span>
                <span>You sent a {giftNotification.name}!</span>
              </div>
            )}

            {/* Simulated Live Video Background */}
            <div className={`absolute inset-0 bg-gradient-to-b ${activeLiveStream.previewBg} flex items-center justify-center`}>
              <div className="relative w-56 h-56 rounded-full border-4 border-rose-500/30 flex items-center justify-center animate-pulse">
                <div className="w-44 h-44 rounded-full bg-gradient-to-tr from-rose-500/40 to-pink-500/40 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center text-center p-4">
                  <Radio className="w-12 h-12 text-rose-400 animate-spin mb-2" />
                  <span className="text-xs font-bold text-white">LIVE STREAM IN PROGRESS</span>
                </div>
              </div>
            </div>

            {/* Top Live Room Header Overlay */}
            <div className="relative z-20 p-4 pt-6 flex justify-between items-center bg-gradient-to-b from-black/80 via-black/40 to-transparent">
              <div className="flex items-center gap-2.5 bg-black/50 backdrop-blur-md p-1.5 pr-3 rounded-full border border-white/10">
                <img src={activeLiveStream.avatar} className="w-9 h-9 rounded-full border-2 border-rose-500 object-cover" />
                <div>
                  <h4 className="text-xs font-bold text-white leading-none">{activeLiveStream.name}</h4>
                  <span className="text-[10px] text-rose-400 flex items-center gap-1 font-semibold mt-0.5">
                    <Radio className="w-2.5 h-2.5 animate-pulse" /> LIVE
                  </span>
                </div>
              </div>

              <button 
                onClick={() => setActiveLiveStream(null)}
                className="p-2 bg-black/50 backdrop-blur-md rounded-full text-white border border-white/10 hover:bg-black/70 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Live Chat Comments Feed */}
            <div className="relative z-20 p-4 flex-1 flex flex-col justify-end overflow-hidden pointer-events-none">
              <div className="space-y-2 max-h-56 overflow-y-auto pointer-events-auto pr-2">
                {liveChatMessages.map(msg => (
                  <div key={msg.id} className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-2 text-xs max-w-[85%]">
                    <span className="font-bold text-pink-400 mr-2">@{msg.user}:</span>
                    <span className="text-slate-200">{msg.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Live Controls & Gifts Bar */}
            <div className="relative z-20 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent space-y-3">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleSendGift('Rose', '🌹')}
                  className="flex-1 py-2 bg-rose-500/20 border border-rose-500/40 text-rose-300 rounded-xl text-xs font-bold flex items-center justify-center gap-1 hover:bg-rose-500/30 transition-all"
                >
                  <Gift className="w-4 h-4 text-rose-400" /> Rose 🌹
                </button>
                <button 
                  onClick={() => handleSendGift('Crown', '👑')}
                  className="flex-1 py-2 bg-amber-500/20 border border-amber-500/40 text-amber-300 rounded-xl text-xs font-bold flex items-center justify-center gap-1 hover:bg-amber-500/30 transition-all"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" /> Crown 👑
                </button>
                <button 
                  onClick={() => handleSendGift('Diamond', '💎')}
                  className="flex-1 py-2 bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 rounded-xl text-xs font-bold flex items-center justify-center gap-1 hover:bg-cyan-500/30 transition-all"
                >
                  <Zap className="w-4 h-4 text-cyan-400" /> Diamond 💎
                </button>
              </div>

              <form onSubmit={handleSendLiveComment} className="flex gap-2">
                <input
                  type="text"
                  value={liveStreamCommentInput}
                  onChange={(e) => setLiveStreamCommentInput(e.target.value)}
                  placeholder="Say something nice..."
                  className="flex-1 bg-black/60 border border-white/20 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                />
                <button type="submit" className="p-2 bg-rose-500 text-white rounded-xl font-bold">
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ==================== PHOTO / VIDEO UPLOAD & CAMERA MODAL ==================== */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex justify-center items-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Camera className="w-5 h-5 text-pink-500" /> Create Post / Camera
              </h3>
              <button 
                onClick={() => {
                  setIsUploadModalOpen(false);
                  setFilePreviewUrl('');
                  setSelectedFile(null);
                }}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Hidden Native File Input */}
            <input 
              type="file"
              ref={fileInputRef}
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* File Selector Drag/Drop Area */}
            {filePreviewUrl ? (
              <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 max-h-64 flex items-center justify-center">
                {uploadType === 'image' ? (
                  <img src={filePreviewUrl} alt="Upload preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="p-8 text-center text-emerald-400">
                    <Flame className="w-12 h-12 mx-auto mb-2 animate-bounce" />
                    <p className="text-xs font-bold">Video File Selected Ready for Reel</p>
                  </div>
                )}
                <button 
                  onClick={() => {
                    setFilePreviewUrl('');
                    setSelectedFile(null);
                  }}
                  className="absolute top-2 right-2 bg-black/70 text-white p-1.5 rounded-full hover:bg-rose-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-700 hover:border-pink-500 rounded-2xl p-8 text-center cursor-pointer transition-colors bg-slate-950/50"
              >
                <div className="w-14 h-14 bg-pink-500/10 text-pink-400 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-pink-500/20">
                  <Upload className="w-7 h-7" />
                </div>
                <h4 className="font-bold text-sm text-white">Upload from Mobile or PC</h4>
                <p className="text-xs text-slate-400 mt-1">Select Photo or Video file from device storage</p>
                <span className="inline-block mt-3 bg-pink-500/20 text-pink-400 text-xs font-bold px-4 py-1.5 rounded-full border border-pink-500/30">
                  Choose File
                </span>
              </div>
            )}

            {/* Caption Input */}
            <div>
              <label className="text-xs font-semibold text-slate-400 mb-1 block">Post Caption & Tags</label>
              <textarea
                value={postCaption}
                onChange={(e) => setPostCaption(e.target.value)}
                placeholder="Write a caption... #photos #vibes"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-pink-500 h-20 resize-none"
              />
            </div>

            <button
              onClick={handlePublishPost}
              disabled={!filePreviewUrl && !postCaption}
              className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 disabled:opacity-40 text-white font-bold rounded-xl text-xs shadow-lg shadow-pink-500/30 transition-all"
            >
              Publish Post
            </button>
          </div>
        </div>
      )}

      {/* ==================== GO LIVE BROADCAST SIMULATOR MODAL ==================== */}
      {isBroadcasting && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex justify-center items-center p-4">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-rose-500/10 text-rose-500 rounded-2xl flex items-center justify-center mx-auto border border-rose-500/20">
              <Radio className="w-8 h-8 animate-pulse" />
            </div>
            <h3 className="font-bold text-white text-lg">Broadcast Camera Ready</h3>
            <p className="text-xs text-slate-400">Your camera and mic are connected. Click below to start broadcasting live to all followers.</p>
            <div className="flex gap-2 pt-2">
              <button 
                onClick={() => setIsBroadcasting(false)}
                className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs"
              >
                Cancel
              </button>
              <button 
                onClick={() => setIsBroadcasting(false)}
                className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-pink-500/30"
              >
                Start Stream
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== VOICE / VIDEO CALL MODAL ==================== */}
      {activeCallModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex justify-center items-center p-4">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 text-center space-y-6 shadow-2xl">
            <img src={selectedChat?.avatar} className="w-20 h-20 rounded-full mx-auto border-4 border-emerald-400 object-cover shadow-lg" />
            <div>
              <h3 className="font-bold text-white text-lg">{selectedChat?.name}</h3>
              <p className="text-xs text-emerald-400 mt-1 flex items-center justify-center gap-1 font-mono">
                {activeCallModal === 'video' ? <Video className="w-4 h-4 animate-pulse" /> : <Phone className="w-4 h-4 animate-pulse" />}
                Connecting {activeCallModal} call...
              </p>
            </div>
            <div className="flex justify-center gap-4">
              <button className="p-3.5 bg-slate-800 rounded-full text-slate-300 hover:bg-slate-700">
                <Mic className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setActiveCallModal(null)}
                className="p-3.5 bg-rose-600 text-white rounded-full hover:bg-rose-700 shadow-lg shadow-rose-600/30"
              >
                <Phone className="w-5 h-5 rotate-[135deg]" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
