import React, { useState, useEffect } from 'react';
import { auth, db } from './firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail
} from 'firebase/auth';
import { 
  collection, addDoc, updateDoc, doc, increment, onSnapshot, query, arrayUnion 
} from 'firebase/firestore';
import { 
  Flame, MessageSquare, Phone, User, Settings, 
  Radio, Heart, MessageCircle, Share2, 
  Volume2, Camera, Sparkles, Send, X, Video, Image as ImageIconLucide, Upload 
} from 'lucide-react';

export default function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [usernameInput, setUsernameInput] = useState('');
  const [genderInput, setGenderInput] = useState('Male');
  const [countryInput, setCountryInput] = useState('Pakistan');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('reels');
  const [subTab, setSubTab] = useState('reels');
  const [reels, setReels] = useState([]);
  
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [captionInput, setCaptionInput] = useState('');
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaType, setMediaType] = useState('video');
  const [activeCommentReel, setActiveCommentReel] = useState(null);
  const [commentInput, setCommentInput] = useState('');

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    const q = query(collection(db, "reels"));
    const unsubscribeReels = onSnapshot(q, async (snapshot) => {
      const reelsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      if (reelsData.length === 0) {
        try {
          await addDoc(collection(db, "reels"), {
            username: "cyber_ninja",
            caption: "Building modern UI tools with React and Tailwind CSS 🚀",
            mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-tree-branches-in-the-breeze-1185-large.mp4",
            mediaType: "video",
            likes: 42100,
            comments: []
          });
        } catch (err) {
          console.log("Error adding default reel:", err);
        }
      } else {
        setReels(reelsData);
      }
    });
    return () => unsubscribeReels();
  }, []);

  const handleAuth = async (e) => {
    e.preventDefault();
    if (isSignUp && !termsAccepted) {
      alert("Barah-e-karam Terms & Conditions ko accept karein!");
      return;
    }

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

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      alert("Pehle apna email address likhein!");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email bhej di gayi hai, apna inbox check karein!");
      setIsForgotPassword(false);
    } catch (error) {
      alert("Masla aaya: " + error.message);
    }
  };

  const handleLogout = () => {
    signOut(auth);
  };

  const handleLike = async (reelId) => {
    try {
      const reelRef = doc(db, "reels", reelId);
      await updateDoc(reelRef, {
        likes: increment(1)
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setMediaFile(fileUrl);
      if (file.type.includes('image')) {
        setMediaType('photo');
      } else {
        setMediaType('video');
      }
    }
  };

  const handleUploadReel = async (e) => {
    e.preventDefault();
    if (!captionInput.trim()) return;
    try {
      const defaultUser = user ? (user.displayName || user.email.split('@')[0]) : "user";
      await addDoc(collection(db, "reels"), {
        username: usernameInput.trim() || defaultUser,
        caption: captionInput,
        mediaUrl: mediaFile || "",
        mediaType: mediaType,
        likes: 1,
        comments: []
      });
      setCaptionInput('');
      setMediaFile(null);
      setShowUploadModal(false);
      alert("Post kamyabi se upload ho gayi!");
    } catch (error) {
      alert("Upload mein masla aaya: " + error.message);
    }
  };

  const handleAddComment = async (e, reelId) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    try {
      const reelRef = doc(db, "reels", reelId);
      const commenterName = user ? (user.displayName || user.email.split('@')[0]) : "Anonymous";
      await updateDoc(reelRef, {
        comments: arrayUnion({
          user: commenterName,
          text: commentInput,
          time: new Date().toLocaleTimeString()
        })
      });
      setCommentInput('');
    } catch (error) {
      alert("Comment save nahi ho saka: " + error.message);
    }
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
            {isForgotPassword ? "Reset Password" : (isSignUp ? "Create a New Account" : "Welcome Back")}
          </h2>

          {isForgotPassword ? (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#1a2233] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-pink-500 text-sm"
                  placeholder="alex@example.com"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-2.5 rounded-lg hover:opacity-90 transition text-sm"
              >
                Send Reset Link
              </button>
              <div className="text-center mt-3">
                <button 
                  type="button"
                  onClick={() => setIsForgotPassword(false)}
                  className="text-xs text-pink-400 hover:underline"
                >
                  Back to Login
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleAuth} className="space-y-3">
              {isSignUp && (
                <>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Username</label>
                    <input 
                      type="text" 
                      required
                      value={usernameInput}
                      onChange={(e) => setUsernameInput(e.target.value)}
                      className="w-full bg-[#1a2233] border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-pink-500 text-sm"
                      placeholder="cyber_ninja"
                    />
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="block text-xs text-gray-400 mb-1">Gender</label>
                      <select 
                        value={genderInput}
                        onChange={(e) => setGenderInput(e.target.value)}
                        className="w-full bg-[#1a2233] border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-pink-500 text-sm"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs text-gray-400 mb-1">Country</label>
                      <input 
                        type="text" 
                        required
                        value={countryInput}
                        onChange={(e) => setCountryInput(e.target.value)}
                        className="w-full bg-[#1a2233] border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-pink-500 text-sm"
                        placeholder="Pakistan"
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs text-gray-400 mb-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#1a2233] border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-pink-500 text-sm"
                  placeholder="alex@example.com"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">Password</label>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#1a2233] border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-pink-500 text-sm"
                  placeholder="••••••••"
                />
              </div>

              {isSignUp && (
                <div className="flex items-center space-x-2 pt-1">
                  <input 
                    type="checkbox" 
                    id="terms"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="w-4 h-4 rounded bg-[#1a2233] border-gray-700 text-pink-500 focus:ring-pink-500"
                  />
                  <label htmlFor="terms" className="text-xs text-gray-400">
                    I accept the <span className="text-pink-400 underline cursor-pointer">Terms & Conditions</span>
                  </label>
                </div>
              )}

              {!isSignUp && (
                <div className="text-right">
                  <button 
                    type="button"
                    onClick={() => setIsForgotPassword(true)}
                    className="text-xs text-pink-400 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-2.5 rounded-lg hover:opacity-90 transition text-sm mt-2"
              >
                {isSignUp ? "Sign Up" : "Log In"}
              </button>
            </form>
          )}

          <div className="text-center mt-4">
            <button 
              onClick={() => { setIsSignUp(!isSignUp); setIsForgotPassword(false); }}
              className="text-xs text-pink-400 hover:underline"
            >
              {isSignUp ? "Already have an account? Log In" : "Don't have an account? Sign Up"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white flex relative">
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
              <span>Reels & Photos</span>
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

      <main className="flex-1 flex flex-col items-center justify-start p-4 overflow-y-auto">
        {activeTab === 'reels' && (
          <div className="w-full max-w-sm flex flex-col items-center space-y-4">
            <div className="flex items-center justify-between w-full bg-[#121824] p-3 rounded-xl border border-gray-800">
              <div className="flex space-x-1.5">
                <button 
                  onClick={() => setSubTab('reels')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${subTab === 'reels' ? 'bg-pink-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                >
                  Reels (Video)
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
                <button 
                  onClick={() => setShowUploadModal(true)}
                  className="p-1.5 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition flex items-center space-x-1 text-xs font-semibold" 
                  title="Upload Post"
                >
                  <Camera className="w-4 h-4" />
                  <span>Upload</span>
                </button>
              </div>
            </div>

            {subTab === 'reels' && reels.filter(r => r.mediaType === 'video').map((reel) => (
              <div key={reel.id} className="w-full bg-[#121824] rounded-2xl overflow-hidden border border-gray-800 shadow-2xl relative mb-4">
                <div className="p-4 flex justify-between items-center border-b border-gray-800">
                  <span className="bg-pink-500/20 text-pink-400 text-xs px-3 py-1 rounded-full font-semibold flex items-center space-x-1">
                    <Flame className="w-3.5 h-3.5" />
                    <span>Trending Reel</span>
                  </span>
                  <Volume2 className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white" />
                </div>
                
                <div className="h-[420px] bg-gradient-to-b from-indigo-950 to-gray-900 flex flex-col items-center justify-center relative p-4 text-center overflow-hidden">
                  {reel.mediaUrl ? (
                    <video src={reel.mediaUrl} controls className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <>
                      <Flame className="w-16 h-16 text-pink-500 mb-4 animate-pulse" />
                      <h2 className="font-bold text-lg text-gray-200">GupShup Video Reel</h2>
                    </>
                  )}
                  
                  <div className="absolute right-4 bottom-16 flex flex-col items-center space-y-4 z-10">
                    <div className="flex flex-col items-center">
                      <Heart 
                        onClick={() => handleLike(reel.id)} 
                        className="w-7 h-7 text-white hover:text-pink-500 cursor-pointer transition active:scale-125 drop-shadow" 
                      />
                      <span className="text-xs mt-1 font-bold">{(reel.likes || 0).toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <MessageCircle 
                        onClick={() => setActiveCommentReel(activeCommentReel === reel.id ? null : reel.id)}
                        className="w-7 h-7 text-white hover:text-pink-500 cursor-pointer transition drop-shadow" 
                      />
                      <span className="text-xs mt-1 font-bold">{reel.comments ? reel.comments.length : 0}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Share2 className="w-7 h-7 text-white hover:text-pink-500 cursor-pointer transition drop-shadow" />
                      <span className="text-xs mt-1 font-bold">Share</span>
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 text-left z-10 bg-black/40 p-2 rounded-lg backdrop-blur-sm max-w-[260px]">
                    <h3 className="font-bold flex items-center space-x-2 text-sm">
                      <span>@{reel.username}</span> 
                      <span className="text-[10px] bg-purple-600 px-1 py-0.5 rounded text-white">Verified</span>
                    </h3>
                    <p className="text-xs text-gray-200 mt-1">{reel.caption}</p>
                  </div>
                </div>

                {activeCommentReel === reel.id && (
                  <div className="bg-[#1a2233] p-4 border-t border-gray-800 max-h-60 overflow-y-auto">
                    <h4 className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Comments</h4>
                    <div className="space-y-2 mb-3">
                      {reel.comments && reel.comments.length > 0 ? (
                        reel.comments.map((c, index) => (
                          <div key={index} className="bg-[#121824] p-2 rounded-lg text-xs">
                            <span className="font-bold text-pink-400">@{c.user}: </span>
                            <span className="text-gray-300">{c.text}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-gray-500 italic">Koi comment nahi hai. Pehla comment aap karein!</p>
                      )}
                    </div>

                    <form onSubmit={(e) => handleAddComment(e, reel.id)} className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Write a comment..." 
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        className="flex-1 bg-[#121824] text-xs px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-pink-500 text-white"
                      />
                      <button type="submit" className="bg-pink-500 hover:bg-pink-600 px-3 py-2 rounded-lg text-white text-xs">
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  </div>
                )}
              </div>
            ))}

            {subTab === 'photos' && reels.filter(r => r.mediaType === 'photo').map((reel) => (
              <div key={reel.id} className="w-full bg-[#121824] rounded-2xl overflow-hidden border border-gray-800 shadow-2xl relative mb-4">
                <div className="p-4 flex justify-between items-center border-b border-gray-800">
                  <span className="bg-indigo-500/20 text-indigo-400 text-xs px-3 py-1 rounded-full font-semibold flex items-center space-x-1">
                    <ImageIconLucide className="w-3.5 h-3.5" />
                    <span>Photo Post</span>
                  </span>
                </div>
                
                <div className="h-[420px] bg-gradient-to-b from-indigo-950 to-gray-900 flex flex-col items-center justify-center relative p-4 text-center overflow-hidden">
                  {reel.mediaUrl ? (
                    <img src={reel.mediaUrl} alt="Photo Post" className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <p className="text-gray-400 text-xs">No Image found</p>
                  )}
                  
                  <div className="absolute right-4 bottom-16 flex flex-col items-center space-y-4 z-10">
                    <div className="flex flex-col items-center">
                      <Heart 
                        onClick={() => handleLike(reel.id)} 
                        className="w-7 h-7 text-white hover:text-pink-500 cursor-pointer transition active:scale-125 drop-shadow" 
                      />
                      <span className="text-xs mt-1 font-bold">{(reel.likes || 0).toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <MessageCircle 
                        onClick={() => setActiveCommentReel(activeCommentReel === reel.id ? null : reel.id)}
                        className="w-7 h-7 text-white hover:text-pink-500 cursor-pointer transition drop-shadow" 
                      />
                      <span className="text-xs mt-1 font-bold">{reel.comments ? reel.comments.length : 0}</span>
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 text-left z-10 bg-black/40 p-2 rounded-lg backdrop-blur-sm max-w-[260px]">
                    <h3 className="font-bold flex items-center space-x-2 text-sm">
                      <span>@{reel.username}</span> 
                    </h3>
                    <p className="text-xs text-gray-200 mt-1">{reel.caption}</p>
                  </div>
                </div>

                {activeCommentReel === reel.id && (
                  <div className="bg-[#1a2233] p-4 border-t border-gray-800 max-h-60 overflow-y-auto">
                    <h4 className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Comments</h4>
                    <div className="space-y-2 mb-3">
                      {reel.comments && reel.comments.length > 0 ? (
                        reel.comments.map((c, index) => (
                          <div key={index} className="bg-[#121824] p-2 rounded-lg text-xs">
                            <span className="font-bold text-pink-400">@{c.user}: </span>
                            <span className="text-gray-300">{c.text}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-gray-500 italic">Koi comment nahi hai. Pehla comment aap karein!</p>
                      )}
                    </div>

                    <form onSubmit={(e) => handleAddComment(e, reel.id)} className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Write a comment..." 
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        className="flex-1 bg-[#121824] text-xs px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-pink-500 text-white"
                      />
                      <button type="submit" className="bg-pink-500 hover:bg-pink-600 px-3 py-2 rounded-lg text-white text-xs">
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  </div>
                )}
              </div>
            ))}

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

      {showUploadModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-[#121824] p-6 rounded-2xl w-full max-w-md border border-gray-800 shadow-2xl relative">
            <button 
              onClick={() => setShowUploadModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Camera className="text-pink-500 w-5 h-5" />
              <span>Upload from Gallery / PC</span>
            </h3>

            <form onSubmit={handleUploadReel} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Select Media File (Photo or Video)</label>
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-700 rounded-xl p-6 cursor-pointer hover:border-pink-500 bg-[#1a2233] transition">
                  <Upload className="w-8 h-8 text-pink-500 mb-2" />
                  <span className="text-xs text-gray-300 font-semibold">
                    {mediaFile ? "File Selected! ✅" : "Click to browse mobile/PC storage"}
                  </span>
                  <span className="text-[10px] text-gray-500 mt-1">Supports MP4, JPG, PNG</span>
                  <input 
                    type="file" 
                    accept="video/*,image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">Your Username for Post</label>
                <input 
                  type="text"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  placeholder="e.g. cyber_ninja"
                  className="w-full bg-[#1a2233] border border-gray-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">Caption / Description</label>
                <textarea 
                  rows="3"
                  required
                  value={captionInput}
                  onChange={(e) => setCaptionInput(e.target.value)}
                  placeholder="What's happening on your mind today? 🚀"
                  className="w-full bg-[#1a2233] border border-gray-700 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-pink-500"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-2.5 rounded-lg hover:opacity-90 transition text-sm shadow-lg"
              >
                Publish Post
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
