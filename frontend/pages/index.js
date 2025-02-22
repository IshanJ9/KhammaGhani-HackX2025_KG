import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";


export default function Home() {
  const { data: session, status } = useSession();

  // Local state for email/password (if you plan to use it)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // The popupCenter function remains the same
  const popupCenter = (url, title) => {
    const dualScreenLeft = window.screenLeft ?? window.screenX;
    const dualScreenTop = window.screenTop ?? window.screenY;

    const width = window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;
    const height = window.innerHeight ?? document.documentElement.clientHeight ?? screen.height;

    const systemZoom = width / window.screen.availWidth;
    const left = (width - 500) / 2 / systemZoom + dualScreenLeft;
    const top = (height - 550) / 2 / systemZoom + dualScreenTop;

    const newWindow = window.open(
      url,
      title,
      `width=${500 / systemZoom},height=${550 / systemZoom},top=${top},left=${left}`
    );

    newWindow?.focus();
  };
  
  // If authenticated, show a simple welcome page
  if (status === "authenticated") {
    return (
      <div style={styles.container}>
        <h2>Welcome {session.user.email} 😀</h2>
        <button style={styles.signOutBtn} onClick={() => signOut()}>
          Sign out
        </button>
      </div>
    );
  }

  // If unauthenticated, show login page
  if (status === "unauthenticated") {
    return (
      <div style={styles.container}>

        
        {/* Email/Password Form (optional) */}
        <form
          style={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            // TODO: Handle your email/password login logic
            alert(`Email: ${email}\nPassword: ${password}`);
          }}
        >
          <label style={styles.label}>E-Mail</label>
          <input
            type="email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />

          <label style={styles.label}>Password</label>
          <input
            type="password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />

          <div style={styles.optionsContainer}>
          
            <a href="#" style={styles.link}>
              Forgot Your Password?
            </a>
          </div>

          <button type="submit" style={styles.loginBtn}>
            Log In
          </button>
        </form>
        {/* Divider */}
        <div style={styles.dividerContainer}>
          <div style={styles.dividerLine} />
          <span style={styles.dividerText}>OR</span>
          <div style={styles.dividerLine} />
        </div>

          {/* The "Login with Google" button */}
        <button
          style={styles.googleBtn}
          onClick={() => popupCenter("/google-signin", "Google Sign In")}
        >
          <FcGoogle style={styles.googleLogo} />
          Login with Google
        </button>
        {/* Register link */}
        <div style={styles.registerContainer}>
          <span>Don’t have an account? </span>
          <a href="#" style={styles.link}>
            Register
          </a>
        </div>
      </div>
    );
  }

  // Otherwise, show loading
  return (
    <div style={styles.container}>
      <h1>Loading...</h1>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "700px", // slightly smaller width
    margin: "2.5rem auto",
    padding: "3rem",   // reduced padding a bit
    borderRadius: "8px",
    backgroundColor: "#fff",
    border: "1px solid #eee",
    textAlign: "center",
  },
  heading: {
    fontSize: "2.2rem", // slightly smaller heading
    marginBottom: "1.2rem",
    fontFamily: "Roboto, sans-serif",
  },
  googleBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#4285f4",
    color: "#fff",
    padding: "0.85rem", // slightly smaller than before
    border: "none",
    borderRadius: "4px",
    marginBottom: "1.2rem",
    cursor: "pointer",
    fontSize: "1.15rem", // slightly smaller font
  },
  googleLogo: {
    width: "24px", // slightly smaller icon
    marginRight: "10px",
  },
  dividerContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "1.2rem",
  },
  dividerLine: {
    flex: 1,
    height: "1px",
    backgroundColor: "#ddd",
  },
  dividerText: {
    margin: "0 0.8rem",
    color: "#888",
    fontSize: "0.95rem",
  },
  form: {
    textAlign: "left",
    marginBottom: "1.8rem",
  },
  label: {
    display: "block",
    marginBottom: "0.4rem",
    fontSize: "1rem", // slightly smaller label size
    fontFamily: "Roboto, sans-serif",
  },
  input: {
    width: "100%",
    padding: "0.65rem", // reduced input padding
    marginBottom: "1.2rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "1rem", // reduced input font size
  },
  optionsContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: "1.2rem",
    fontSize: "0.95rem",
  },
  link: {
    color: "#4285f4",
    textDecoration: "none",
    fontFamily: "Roboto, sans-serif",
    fontSize: "0.9rem", // slightly larger than before but overall balanced
  },
  loginBtn: {
    width: "100%",
    padding: "0.85rem",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#4285f4",
    color: "#fff",
    fontSize: "1.15rem",
    cursor: "pointer",
    marginBottom: "1.2rem",
  },
  registerContainer: {
    textAlign: "center",
    fontSize: "1rem",
    fontFamily: "Roboto, sans-serif",
  },
  signOutBtn: {
    padding: "0.85rem",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#dc3545",
    color: "#fff",
    fontSize: "1.15rem",
    cursor: "pointer",
  },
};
