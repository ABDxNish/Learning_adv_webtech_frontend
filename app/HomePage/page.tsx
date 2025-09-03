import Link from "next/link";

export default function Home() {
  return (
    <>
      <div align="Top" >
        <Link href="/HomePage/LogIn">
          <button style={{ backgroundColor: "green", color: "white", padding: "10px" }}> Get Started </button>
        </Link>
          &nbsp;&nbsp;
        <Link href="/HomePage/SignUp">
          <button style={{ backgroundColor: "blue", color: "white", padding: "10px" }}> SignUp </button>
        </Link>
          &nbsp;&nbsp;
        <Link href="/HomePage/AboutUs">
          <button style={{ backgroundColor: "orange", color: "white", padding: "10px" }}> Aboutus </button>
        </Link>
        <p>hello </p>
      </div>
    </>
  );
}
