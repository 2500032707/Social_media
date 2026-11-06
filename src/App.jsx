
import React, { useEffect, useMemo, useState } from "react";
import {
  Home, Compass, Users, UserRound, LogOut, Heart,
  MessageCircle, Share2, Plus, Search, Image,
  Send, ShieldCheck, Trash2, Menu, X, BarChart3,
  LayoutDashboard, Settings, Bell, Sparkles
} from "lucide-react";

import "./style.css";

const KEY = "connectly_v1";

const starter = {
  users: [
    {
      id: 1,
      name: "Alex Morgan",
      username: "alexm",
      email: "alex@connectly.demo",
      password: "demo123",
      role: "user",
      bio: "Creative mind • coffee lover ☕",
      avatar: "https://i.pravatar.cc/120?img=12"
    },
    {
      id: 2,
      name: "Priya Sharma",
      username: "priya",
      email: "priya@connectly.demo",
      password: "demo123",
      role: "user",
      bio: "Collecting little moments ✨",
      avatar: "https://i.pravatar.cc/120?img=47"
    },
    {
      id: 3,
      name: "Jordan Lee",
      username: "jordan",
      email: "jordan@connectly.demo",
      password: "demo123",
      role: "user",
      bio: "Design, travel and good music.",
      avatar: "https://i.pravatar.cc/120?img=13"
    },
    {
      id: 99,
      name: "Platform Admin",
      username: "admin",
      email: "admin@connectly.demo",
      password: "admin123",
      role: "admin",
      bio: "Managing Connectly.",
      avatar: "https://i.pravatar.cc/120?img=68"
    }
  ],
  posts: [
    {
      id: 101,
      userId: 2,
      text: "A little reminder to slow down and enjoy the beautiful things around you. 🌷",
      image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1000",
      created: Date.now() - 3600000,
      likes: [1, 3],
      comments: [
        { id: 1, userId: 1, text: "Such a lovely reminder!" }
      ]
    },
    {
      id: 102,
      userId: 3,
      text: "Weekend adventures and fresh perspectives. What is everyone exploring this week?",
      image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1000",
      created: Date.now() - 7200000,
      likes: [2],
      comments: []
    }
  ]
};

function readDB() {
  try {
    const data = localStorage.getItem(KEY);
    return data ? JSON.parse(data) : starter;
  } catch {
    return starter;
  }
}

const timeAgo = (time) => {
  const mins = Math.max(1, Math.floor((Date.now() - time) / 60000));
  if (mins < 60) return `${mins}m ago`;
  if (mins < 1440) return `${Math.floor(mins / 60)}h ago`;
  return `${Math.floor(mins / 1440)}d ago`;
};

// ---------------- AUTHENTICATION ----------------

function Auth({ users, onLogin }) {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function submit(e) {
    e.preventDefault();
    setError("");

    if (mode === "signup") {
      if (!name.trim()) return setError("Enter your name.");

      if (users.some(
        u => u.email.toLowerCase() === email.toLowerCase()
      )) {
        return setError("Email already registered.");
      }

      if (password.length < 6) {
        return setError("Password must be at least 6 characters.");
      }

      const newUser = {
        id: Date.now(),
        name: name.trim(),
        username: email.split("@")[0],
        email,
        password,
        role: "user",
        bio: "New to Connectly ✨",
        avatar: `https://i.pravatar.cc/120?u=${encodeURIComponent(email)}`
      };

      onLogin(newUser, true);
    } else {
      const user = users.find(
        u =>
          u.email.toLowerCase() === email.toLowerCase() &&
          u.password === password
      );

      if (!user) return setError("Invalid email or password.");

      onLogin(user, false);
    }
  }

  return (
    <main className="auth-wrap">
      <section className="auth-art">
        <div className="brand light">
          <span className="brand-mark">c.</span>
          connectly
        </div>

        <div className="art-copy">
          <span className="eyebrow">YOUR PEOPLE. YOUR MOMENTS.</span>
          <h1>Make real<br />connections.</h1>
          <p>
            Share your world, discover new perspectives,
            and stay close to the people who matter.
          </p>
        </div>

        <div className="art-foot">
          A little more connected, every day.
        </div>
      </section>

      <section className="auth-panel">
        <div className="auth-card">
          <div className="mobile-brand brand">
            <span className="brand-mark">c.</span>
            connectly
          </div>

          <span className="eyebrow purple">
            {mode === "login" ? "WELCOME BACK" : "GET STARTED"}
          </span>

          <h2>
            {mode === "login"
              ? "Sign in to Connectly"
              : "Create your account"}
          </h2>

          <p className="muted">
            {mode === "login"
              ? "Your community is waiting for you."
              : "Join the conversation and share your story."}
          </p>

          <form onSubmit={submit}>
            {mode === "signup" && (
              <label>
                Full name
                <input
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your name"
                />
              </label>
            )}

            <label>
              Email address
              <input
                required
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </label>

            <label>
              Password
              <input
                required
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </label>

            {error && <div className="error">{error}</div>}

            <button className="primary full" type="submit">
              {mode === "login" ? "Sign in" : "Create account"} →
            </button>
          </form>

          <p className="switch">
            {mode === "login"
              ? "Don't have an account?"
              : "Already have an account?"}

            <button
              onClick={() => {
                setMode(mode === "login" ? "signup" : "login");
                setError("");
              }}
            >
              {mode === "login" ? "Sign up" : "Sign in"}
            </button>
          </p>

          <div className="demo-box">
            <b>Demo credentials</b>
            <span>User: alex@connectly.demo / demo123</span>
            <span>Admin: admin@connectly.demo / admin123</span>
          </div>
        </div>
      </section>
    </main>
  );
}

// ---------------- MAIN APPLICATION ----------------

export default function App() {
  const [db, setDb] = useState(readDB);

  const [current, setCurrent] = useState(() => {
    const id = Number(localStorage.getItem("connectly_session"));
    return readDB().users.find(u => u.id === id) || null;
  });

  const [page, setPage] = useState("Dashboard");
  const [search, setSearch] = useState("");
  const [postText, setPostText] = useState("");
  const [postImage, setPostImage] = useState("");
  const [commentDraft, setCommentDraft] = useState({});
  const [profileId, setProfileId] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(db));
  }, [db]);

  const users = db.users;

  const posts = useMemo(
    () => [...db.posts].sort((a, b) => b.created - a.created),
    [db.posts]
  );

  const userById = id =>
    users.find(u => u.id === id) || {
      name: "Unknown user",
      username: "unknown",
      avatar: ""
    };

  function update(fn) {
    setDb(prev => {
      const copy = structuredClone(prev);
      return fn(copy);
    });
  }

  function login(user, isNew) {
    if (isNew) {
      setDb(prev => ({
        ...prev,
        users: [...prev.users, user]
      }));
    }

    setCurrent(user);
    localStorage.setItem("connectly_session", String(user.id));

    setPage(user.role === "admin" ? "Dashboard" : "Home");
  }

  function logout() {
    setCurrent(null);
    localStorage.removeItem("connectly_session");
    setPage("Dashboard");
  }

  function navigate(name) {
    setPage(name);
    setProfileId(null);
    setMobileOpen(false);
  }

  // ---------------- USER FUNCTIONS ----------------

  function createPost(e) {
    e.preventDefault();

    if (!postText.trim()) return;

    update(d => {
      d.posts.push({
        id: Date.now(),
        userId: current.id,
        text: postText.trim(),
        image: postImage.trim(),
        created: Date.now(),
        likes: [],
        comments: []
      });

      return d;
    });

    setPostText("");
    setPostImage("");
  }

  function toggleLike(id) {
    update(d => {
      const post = d.posts.find(p => p.id === id);

      if (!post) return d;

      post.likes = post.likes.includes(current.id)
        ? post.likes.filter(id => id !== current.id)
        : [...post.likes, current.id];

      return d;
    });
  }

  function addComment(id) {
    const value = (commentDraft[id] || "").trim();

    if (!value) return;

    update(d => {
      const post = d.posts.find(p => p.id === id);

      if (post) {
        post.comments.push({
          id: Date.now(),
          userId: current.id,
          text: value
        });
      }

      return d;
    });

    setCommentDraft(v => ({ ...v, [id]: "" }));
  }

  // ---------------- ADMIN FUNCTIONS ----------------

  function deletePost(id) {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }

    update(d => {
      d.posts = d.posts.filter(p => p.id !== id);
      return d;
    });
  }

  function deleteUser(id) {
    if (!window.confirm("Remove this user and their posts?")) return;

    update(d => {
      d.users = d.users.filter(u => u.id !== id);

      d.posts = d.posts.filter(p => p.userId !== id);

      d.posts.forEach(p => {
        p.likes = p.likes.filter(userId => userId !== id);
        p.comments = p.comments.filter(c => c.userId !== id);
      });

      return d;
    });
  }

  if (!current) {
    return <Auth users={users} onLogin={login} />;
  }

  // ---------------- POST COMPONENT ----------------

  function PostCard({ post }) {
    const author = userById(post.userId);

    return (
      <article className="post-card">
        <div className="post-head">
          <img className="avatar" src={author.avatar} />

          <div className="post-author">
            <b>{author.name}</b>
            <span>
              @{author.username} · {timeAgo(post.created)}
            </span>
          </div>

          {(current.role === "admin" ||
            current.id === post.userId) && (
            <button
              className="icon-button push"
              onClick={() => deletePost(post.id)}
              title="Delete post"
            >
              <Trash2 size={17} />
            </button>
          )}
        </div>

        <p className="post-text">{post.text}</p>

        {post.image && (
          <img
            className="post-image"
            src={post.image}
            alt="Post attachment"
          />
        )}

        <div className="post-actions">
          <button
            className={post.likes.includes(current.id) ? "liked" : ""}
            onClick={() => toggleLike(post.id)}
          >
            <Heart
              size={19}
              fill={
                post.likes.includes(current.id)
                  ? "currentColor"
                  : "none"
              }
            />
            {post.likes.length} Likes
          </button>

          <span>
            <MessageCircle size={18} />
            {post.comments.length} Comments
          </span>

          <button
            className="share-action"
            onClick={() => {
              navigator.clipboard?.writeText(post.text);
              alert("Post text copied!");
            }}
          >
            <Share2 size={18} />
            Share
          </button>
        </div>

        <div className="comments">
          {post.comments.map(comment => (
            <div className="comment" key={comment.id}>
              <b>{userById(comment.userId).name}</b>
              <span>{comment.text}</span>
            </div>
          ))}
        </div>

        <form
          className="comment-form"
          onSubmit={e => {
            e.preventDefault();
            addComment(post.id);
          }}
        >
          <img src={current.avatar} />

          <input
            value={commentDraft[post.id] || ""}
            onChange={e =>
              setCommentDraft(v => ({
                ...v,
                [post.id]: e.target.value
              }))
            }
            placeholder="Write a comment..."
          />

          <button type="submit">
            <Send size={17} />
          </button>
        </form>
      </article>
    );
  }

  // ---------------- SEPARATE ADMIN DASHBOARD ----------------

  if (current.role === "admin") {
    const totalUsers = users.filter(u => u.role === "user").length;

    const totalLikes = posts.reduce(
      (total, post) => total + post.likes.length,
      0
    );

    const adminLinks = [
      ["Dashboard", LayoutDashboard],
      ["User Management", Users],
      ["Post Management", MessageCircle],
      ["Analytics", BarChart3]
    ];

    return (
      <div className="app-shell admin-layout">

        <aside className={`sidebar ${mobileOpen ? "open" : ""}`}>
          <div className="brand">
            <span className="brand-mark">c.</span>
            connectly
          </div>

          <div className="side-label">ADMINISTRATION</div>

          {adminLinks.map(([name, Icon]) => (
            <button
              key={name}
              className={`nav-item ${page === name ? "active" : ""}`}
              onClick={() => navigate(name)}
            >
              <Icon size={19} />
              {name}
            </button>
          ))}

          <div className="side-bottom">
            <div className="mini-user">
              <img src={current.avatar} />
              <div>
                <b>{current.name}</b>
                <span>Administrator</span>
              </div>
            </div>

            <button className="nav-item logout" onClick={logout}>
              <LogOut size={18} />
              Log out
            </button>
          </div>
        </aside>

        <main className="main-area">

          <header className="topbar">
            <button
              className="mobile-menu icon-button"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <Menu />
            </button>

            <div>
              <span className="eyebrow">CONNECTLY ADMIN PANEL</span>
              <h2>{page}</h2>
            </div>

            <div className="top-actions">
              <span className="role-tag">ADMIN</span>
              <img className="top-avatar" src={current.avatar} />
            </div>
          </header>

          <section className="page-content">

            {page === "Dashboard" && (
              <>
                <div className="page-intro">
                  <span className="eyebrow purple">
                    PLATFORM OVERVIEW
                  </span>
                  <h1>Welcome, Administrator!</h1>
                  <p>
                    Manage your Connectly social media platform.
                  </p>
                </div>

                <div className="stats-grid">
                  <div className="stat-card">
                    <Users size={24} />
                    <span>Total Users</span>
                    <b>{totalUsers}</b>
                  </div>

                  <div className="stat-card">
                    <MessageCircle size={24} />
                    <span>Total Posts</span>
                    <b>{posts.length}</b>
                  </div>

                  <div className="stat-card">
                    <Heart size={24} />
                    <span>Total Likes</span>
                    <b>{totalLikes}</b>
                  </div>
                </div>

                <div className="admin-table">
                  <h3>Recent Posts</h3>

                  {posts.slice(0, 5).map(post => (
                    <div className="admin-row" key={post.id}>
                      <div className="post-preview">
                        {post.text}
                      </div>

                      <span>{userById(post.userId).name}</span>

                      <button
                        className="danger-button"
                        onClick={() => deletePost(post.id)}
                      >
                        <Trash2 size={15} />
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}

            {page === "User Management" && (
              <>
                <div className="page-intro">
                  <span className="eyebrow purple">
                    MEMBER CONTROL
                  </span>
                  <h1>User Management</h1>
                  <p>View and manage registered users.</p>
                </div>

                <div className="searchbox">
                  <Search size={17} />
                  <input
                    placeholder="Search users..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>

                <div className="admin-table">
                  <h3>Registered Users ({totalUsers})</h3>

                  {users
                    .filter(u =>
                      u.role === "user" &&
                      (u.name.toLowerCase().includes(search.toLowerCase()) ||
                       u.email.toLowerCase().includes(search.toLowerCase()))
                    )
                    .map(user => (
                      <div className="admin-row" key={user.id}>
                        <img src={user.avatar} />

                        <div>
                          <b>{user.name}</b>
                          <span>{user.email}</span>
                        </div>

                        <span className="role-tag">USER</span>

                        <button
                          className="danger-button"
                          onClick={() => deleteUser(user.id)}
                        >
                          <Trash2 size={15} />
                          Remove
                        </button>
                      </div>
                    ))}
                </div>
              </>
            )}

            {page === "Post Management" && (
              <>
                <div className="page-intro">
                  <span className="eyebrow purple">
                    CONTENT MODERATION
                  </span>
                  <h1>Post Management</h1>
                  <p>Review and moderate community posts.</p>
                </div>

                <div className="admin-table">
                  <h3>All Posts ({posts.length})</h3>

                  {posts.map(post => (
                    <div className="admin-row" key={post.id}>
                      <div className="post-preview">
                        {post.text}
                      </div>

                      <span>{userById(post.userId).name}</span>

                      <button
                        className="danger-button"
                        onClick={() => deletePost(post.id)}
                      >
                        <Trash2 size={15} />
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}

            {page === "Analytics" && (
              <>
                <div className="page-intro">
                  <span className="eyebrow purple">
                    PLATFORM STATISTICS
                  </span>
                  <h1>Analytics</h1>
                  <p>Overview of Connectly platform activity.</p>
                </div>

                <div className="stats-grid">
                  <div className="stat-card">
                    <Users />
                    <span>Registered Users</span>
                    <b>{totalUsers}</b>
                  </div>

                  <div className="stat-card">
                    <MessageCircle />
                    <span>Published Posts</span>
                    <b>{posts.length}</b>
                  </div>

                  <div className="stat-card">
                    <Heart />
                    <span>Total Likes</span>
                    <b>{totalLikes}</b>
                  </div>
                </div>

                <div className="admin-table">
                  <h3>Platform Activity</h3>
                  <p>Comments: {posts.reduce((n, p) => n + p.comments.length, 0)}</p>
                  <p>Users: {totalUsers}</p>
                  <p>Posts: {posts.length}</p>
                  <p>Likes: {totalLikes}</p>
                </div>
              </>
            )}

          </section>

          <footer className="footer">
            © 2026 Connectly Admin Panel
          </footer>
        </main>
      </div>
    );
  }

  // ---------------- SEPARATE USER DASHBOARD ----------------

  const userLinks = [
    ["Home", Home],
    ["Explore", Compass],
    ["Community", Users],
    ["Profile", UserRound]
  ];

  const visibleUsers = users.filter(
    u =>
      u.role === "user" &&
      (u.name.toLowerCase().includes(search.toLowerCase()) ||
       u.username.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="app-shell">

      <aside className={`sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="brand">
          <span className="brand-mark">c.</span>
          connectly
        </div>

        <div className="side-label">MENU</div>

        {userLinks.map(([name, Icon]) => (
          <button
            key={name}
            className={`nav-item ${page === name ? "active" : ""}`}
            onClick={() => {
              if (name === "Profile") setProfileId(current.id);
              navigate(name);
            }}
          >
            <Icon size={19} />
            {name}
          </button>
        ))}

        <div className="side-bottom">
          <div className="mini-user">
            <img src={current.avatar} />
            <div>
              <b>{current.name}</b>
              <span>@{current.username}</span>
            </div>
          </div>

          <button className="nav-item logout" onClick={logout}>
            <LogOut size={18} />
            Log out
          </button>
        </div>
      </aside>

      <main className="main-area">

        <header className="topbar">
          <button
            className="mobile-menu icon-button"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Menu />
          </button>

          <div>
            <span className="eyebrow">YOUR SOCIAL SPACE</span>
            <h2>{page}</h2>
          </div>

          <div className="top-actions">
            <div className="searchbox">
              <Search size={17} />
              <input
                placeholder="Search people..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            <img className="top-avatar" src={current.avatar} />
          </div>
        </header>

        <section className="page-content">

          {page === "Home" && (
            <>
              <div className="welcome-banner">
                <div>
                  <span className="eyebrow">A PLACE TO BE YOU</span>
                  <h1>Good things happen<br />when we connect.</h1>
                  <p>Share a moment. Start a conversation.</p>
                </div>

                <div className="banner-orb">✦</div>
              </div>

              <form className="composer" onSubmit={createPost}>
                <div className="composer-top">
                  <img src={current.avatar} />

                  <textarea
                    value={postText}
                    onChange={e => setPostText(e.target.value)}
                    placeholder={`What's on your mind, ${current.name.split(" ")[0]}?`}
                  />
                </div>

                <div className="composer-bottom">
                  <label className="image-link">
                    <Image size={17} />
                    <input
                      placeholder="Paste image URL"
                      value={postImage}
                      onChange={e => setPostImage(e.target.value)}
                    />
                  </label>

                  <button className="primary" type="submit">
                    Share Post <Plus size={16} />
                  </button>
                </div>
              </form>

              <div className="section-heading">
                <div>
                  <h3>Your Feed</h3>
                  <p>Fresh updates from your community.</p>
                </div>
                <span className="feed-pill">
                  <Sparkles size={14} /> Latest
                </span>
              </div>

              {posts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </>
          )}

          {page === "Explore" && (
            <>
              <div className="page-intro">
                <span className="eyebrow purple">DISCOVER</span>
                <h1>Explore People</h1>
                <p>Find new people in your community.</p>
              </div>

              <div className="people-grid">
                {visibleUsers
                  .filter(u => u.id !== current.id)
                  .map(user => (
                    <div className="person-card" key={user.id}>
                      <img src={user.avatar} />
                      <h3>{user.name}</h3>
                      <span>@{user.username}</span>
                      <p>{user.bio}</p>

                      <button
                        className="outline"
                        onClick={() => {
                          setProfileId(user.id);
                          setPage("Profile");
                        }}
                      >
                        View Profile
                      </button>
                    </div>
                  ))}
              </div>
            </>
          )}

          {page === "Community" && (
            <>
              <div className="page-intro">
                <span className="eyebrow purple">GROW TOGETHER</span>
                <h1>Your Community</h1>
                <p>Meet your fellow members.</p>
              </div>

              <div className="people-grid">
                {visibleUsers.map(user => (
                  <div className="person-card" key={user.id}>
                    <img src={user.avatar} />
                    <h3>{user.name}</h3>
                    <span>@{user.username}</span>
                    <p>{user.bio}</p>

                    <button
                      className="outline"
                      onClick={() => {
                        setProfileId(user.id);
                        setPage("Profile");
                      }}
                    >
                      View Profile
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {page === "Profile" && (() => {
            const target = userById(profileId || current.id);
            const own = target.id === current.id;
            const userPosts = posts.filter(p => p.userId === target.id);

            return (
              <>
                <div className="profile-hero">
                  <div className="profile-cover" />

                  <img
                    className="profile-large-avatar"
                    src={target.avatar}
                  />

                  <div className="profile-hero-info">
                    <h1>{target.name}</h1>
                    <span>@{target.username}</span>
                    <p>{target.bio}</p>
                  </div>

                  <div className="profile-hero-count">
                    <b>{userPosts.length}</b>
                    <span>Posts</span>
                  </div>
                </div>

                {own && (
                  <button
                    className="outline edit-profile"
                    onClick={() => {
                      const bio = prompt("Update your bio:", target.bio);

                      if (bio !== null) {
                        update(d => {
                          d.users.find(u => u.id === current.id).bio = bio;
                          return d;
                        });
                      }
                    }}
                  >
                    Edit Bio
                  </button>
                )}

                <div className="section-heading">
                  <h3>{own ? "Your Posts" : `${target.name}'s Posts`}</h3>
                </div>

                {userPosts.map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
              </>
            );
          })()}

        </section>

        <footer className="footer">
          © 2026 Connectly · Made for meaningful connections
        </footer>
      </main>
    </div>
  );
}
