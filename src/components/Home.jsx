import StoreFront from '../assets/StoreFront.jpg';
import FlagBackground from '../assets/American_flag_bkgrnd.jpg';
import "./styles/Home.css";

function Home() {
    return (<div className="contentContainer" style={{
        backgroundImage: `url(${FlagBackground})`,
        backgroundSize: 'cover', 
        color: 'beige',
    }}>
        <h1>Welcome to store America</h1>
        <img src={StoreFront} />
        <p>**Discover America: Where Craftsmanship Meets Choice!**</p>

<p>At **America**, we honor the legacy of hardworking artisans who shape our nation. Our e-store celebrates the American spirit, offering a diverse range of meticulously crafted products for both men and women. From rugged workwear to elegant jewelry and cutting-edge electronics, our collection embodies the dedication of the American Working Man and Woman. 🛠️💎🔌</p>

<h2>**Why Choose America?**</h2>

<li>
    <ol>1. **Crafted Excellence**: Our clothing blends rugged durability with style, while our jewelry sparkles with timeless elegance. Our electronics? Cutting-edge, of course!</ol>
    <ol>2. **Empowering Choices**: Whether you're a craftsman or a tech enthusiast, America has something for everyone.</ol>
    <ol>3. **Proudly American**: By choosing America, you're supporting local businesses and the heartbeat of our economy.</ol>
</li>
<p>"I make products for the American working man, because that's what I am and that's who I care about." This motto drives us every day. We understand the grit, sweat, and pride that go into a hard day's work. That's why our products are designed to withstand the rigors of your labor, enhance your style, and keep you connected. Join us in celebrating the heart and soul of America. Explore the American Craftsmen Collection, adorn yourself with exquisite jewelry, and stay connected with top-notch electronics—all under one star-spangled roof. 🛒.</p>
    </div>);
}

export default Home;