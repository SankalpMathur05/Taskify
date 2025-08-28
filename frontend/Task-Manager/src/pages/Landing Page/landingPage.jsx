import React from 'react';
import './landingPage.css';
import { Link } from 'react-router-dom';

// Logo and gif Imports
import taskifyLogo from '../../assets/images/logo.png';
import gifMain from '../../assets/images/gif-main.mp4';

// Logo imports
import gameveda1 from '../../assets/images/gameveda.png';
import node1 from '../../assets/images/node.png';
import pandaprep1 from '../../assets/images/pandaprep.png';
import quadrafort1 from '../../assets/images/quadrafort.png'
import react1 from '../../assets/images/react.png';
import srijan1 from '../../assets/images/srijan.png';
import ted1 from '../../assets/images/ted.png';

// About Us image imports
import aboutImg1 from '../../assets/images/about-img1.png';
import aboutImg2 from '../../assets/images/about-img2.mp4';
import aboutImg3 from '../../assets/images/about-img3.mp4';
import aboutImg4 from '../../assets/images/about-img4.png';

// Our Services imports
import plannerImg from '../../assets/images/Planner.png';
import todoImg from '../../assets/images/to-do lists.png';
import collaborationImg from '../../assets/images/collaboration.png';
import managePersonalImg from '../../assets/images/managePersonal.png';
import whiteboardImg from '../../assets/images/whiteboard.png';

// JoinOurCommunity Section
import joinCommunityImg from '../../assets/images/joinOurCommunity.png';

// Logos for Trusted by Teams section
import cdc from '../../assets/images/teamsTrust/cdc.png';
import gameveda from '../../assets/images/teamsTrust/gameveda.png';
import grs from '../../assets/images/teamsTrust/grs.png';
import node from '../../assets/images/teamsTrust/node.png';
import pandaprep from '../../assets/images/teamsTrust/pandaprep.png';
import qrace from '../../assets/images/teamsTrust/qrace.png';
import quadrafort from '../../assets/images/teamsTrust/quadrafort.png';
import react from '../../assets/images/teamsTrust/react.png';
import srijan from '../../assets/images/teamsTrust/srijan.png';
import ted from '../../assets/images/teamsTrust/ted.png';
import vips from '../../assets/images/teamsTrust/vips.png';

// Footer assets
import footerLogo from '../../assets/images/Footer/taskify.png';
import footerGmail from '../../assets/images/Footer/gmail.svg';

const gridItems = [
    { type: 'empty', className: 'empty-top-left' }, // Row 1, Col 1
    { type: 'empty', className: 'empty-top-2' },    // Row 1, Col 2 (above Figma)
    { type: 'empty', className: 'empty-top-3' },    // Row 1, Col 3 (above Trello)
    { type: 'empty', className: 'empty-top-4' },    // Row 1, Col 4 (above ChatGPT)
    { type: 'empty', className: 'empty-top-5' },    // Row 1, Col 5 (above Deepseek)
    { type: 'empty', className: 'empty-top-6' },    // Row 1, Col 6 (above Notion)
    { type: 'empty', className: 'empty-top-7' },    // Row 1, Col 7 (above Instagram)

    // Row 2 and 3 items (logos that span 2 rows)
    { type: 'logo', className: 'grs', src: grs, alt: 'GRS Logo' },
    { type: 'logo', className: 'vips', src: vips, alt: 'Vips Logo' },
    { type: 'logo', className: 'srijan', src: srijan, alt: 'Srijan Logo' },
    { type: 'logo', className: 'pandaprep', src: pandaprep, alt: 'Pandaprep Logo' },
    { type: 'logo', className: 'ted', src: ted, alt: 'TEDx Logo' },
    { type: 'logo', className: 'quadrafort', src: quadrafort, alt: 'Quadrafort Logo' },
    { type: 'logo', className: 'react', src: react, alt: 'React Bits Logo' },

    // Row 4 and 5 items
    { type: 'logo', className: 'cdc', src: cdc, alt: 'CDC Logo' },
    { type: 'logo', className: 'gameveda', src: gameveda, alt: 'GameVeda Logo' },
    { type: 'empty', className: 'empty-middle-1' }, // Placeholder to push Dream11
    { type: 'empty', className: 'empty-middle-2' }, // Placeholder to push Dream11
    { type: 'empty', className: 'empty-middle-3' }, // Placeholder for the gap near Amazon
    { type: 'logo', className: 'node', src: node, alt: 'Node JS Logo' }, 
    { type: 'logo', className: 'qrace', src: qrace, alt: 'QRACE Logo' },
];

const LandingPage = () => {
  const handleClick = (label) => {
    alert(`You clicked "${label}"`);
  };

  return (
    <div className="landing-page">
      <nav className="navbar">
        <div className="logo-container">
          <img src={taskifyLogo} alt="Taskify Logo" className="logo-image" />
        </div>

        <div className="action-buttons">
          <Link to="/login" className="primary-btn"> Login </Link> 
          <Link to="/signup" className="secondary-btn"> Sign up </Link> 
        </div>
      </nav>

      <div className="banner-section">
        <div className="banner-left">
          <h1>
            <span className="banner-heading">Where Your Tasks</span>
            <span className="banner-heading">Turn Into Triumphs.</span>
          </h1>
          <p className="banner-subtext">
            Taskify makes organizing feel effortless and executing feel natural. Say goodbye to cluttered workflows and scattered priorities. Because great work happens when your tools get out of the way and let your ideas shine.
          </p>
          <div className="banner-buttons">
            <Link to="/signup" className="btn primary-banner-btn">Get Taskify</Link> 
          </div>
        </div>
        <div className="banner-right">
          <video src={gifMain} className="banner-gif" autoPlay loop muted playsInline />
        </div>
      </div>

        <div className="trusted-by">
        <p className="trusted-title">Trusted by top teams</p>
            <div className="trusted-logos">
                <img src={pandaprep1} alt="Pandaprep" />
                <img src={ted1} alt="TEDx" />
                <img src={react1} alt="React" />
                <img src={srijan1} alt="Srijan" />
                <img src={gameveda1} alt="Gameveda" />
                <img src={quadrafort1} alt="Quadrafort" />
                <img src={node1} alt="Node JS" />
            </div>
        </div>

        {/* About Us Section */}
        <section className="about-section" id="about">
          <div className="about-title">
            <h2>ABOUT US</h2>
          </div>

        <div className="about-grid">
            {/* Row 1 */}
            <div className="about-img-box">
            <img src={aboutImg1} alt="Productivity Graphic" className="about-img" />
            </div>

            <div className="about-img">
            <video src={aboutImg2} className = "about-img-row3" autoPlay loop muted playsInline />
            </div>

            <div className="about-box teal-box full-span">
            <div className="teal-box-title">
              <h1><strong>Every great idea starts with a problem - ours was simple</strong></h1>
            </div>
            <p>
                We were tired of juggling planners, sticky notes, chat apps, and endless tabs.
                So we built Taskify — a space where everything comes together: tasks, priorities, and people.
                From a personal to-do list to a team-wide project board, Taskify is designed to feel intuitive,
                flow naturally, and scale with you. Too many tools, not enough clarity.
            </p>
            </div>

            {/* Row 2 */}
            <div className="about-box yellow-box tall-box">
            <div className="yellow-box-title">
              <h1><strong><center>Our Philosophy</center></strong></h1>
            </div>
            <p>
                We believe productivity isn’t about doing more — 
                <strong> it’s about doing what truly matters, with clarity and calm.</strong><br /><br />
                In a world full of noise, tools should help you focus not add to the chaos.
                That’s why we built Taskify simple, purposeful, and distraction-free.
                Whether you're planning your day or managing a project with your team,
                Taskify adapts to you — not the other way around.
            </p>
            </div>

            {/* Row 3 */}
            <div className="about-img-box">
              <video src={aboutImg3} className="about-img-row3" autoPlay loop muted playsInline />
            </div>
            <div className="about-box pink-box">
            <h1>Plan<br />Prioritise<br />Progress..</h1>
            </div>
            <img src={aboutImg4} alt="Team Collaborating" className="about-img-row3" />
        </div>
        </section>

        {/* Our Services Section */}
        <section className="services-section" id="services">
          <div className="services-carousel-container">
            <div className="carousel-track" id="carouselTrack">

              <div className="service-card">
                <img src={todoImg} alt="To-Do Lists" className="service-img" />
                <h3 className="service-title">Create To-Do Lists</h3>
                <p className="service-description">Break down your goals into manageable tasks with smart checklists.</p>
              </div>

              <div className="service-card">
                <img src={collaborationImg} alt="Collaboration" className="service-img" />
                <h3 className="service-title">Collaborate with Teams</h3>
                <p className="service-description">Work with your team in real-time. Share updates and progress.</p>
              </div>

              <div className="service-card">
                <img src={plannerImg} alt="Planner" className="service-img" />
                <h3 className="service-title">Download Team Reports</h3>
                <p className="service-description">Get detailed summaries of your team's work. Export progress reports and insights in one click.</p>
              </div>

              <div className="service-card">
                <img src={managePersonalImg} alt="Manage Goals" className="service-img" />
                <h3 className="service-title">Manage Personal Tasks</h3>
                <p className="service-description">Track habits, personal projects, and long-term growth. (Coming Soon)</p>
              </div>

              <div className="service-card">
                <img src={whiteboardImg} alt="Whiteboard" className="service-img" />
                <h3 className="service-title">Whiteboard</h3>
                <p className="service-description">Visualize your ideas and connect the dots using digital whiteboards. (Coming Soon)</p>
              </div>
            </div>

            <h2 className="services-heading">Our Services</h2>
            
            <div className="carousel-controls">
              <button className="carousel-btn" onClick={() => document.getElementById('carouselTrack').scrollBy({ left: -320, behavior: 'smooth' })}>
                &#171;
              </button>
              <button className="carousel-btn" onClick={() => document.getElementById('carouselTrack').scrollBy({ left: 320, behavior: 'smooth' })}>
                &#187;
              </button>
            </div>
          </div>
        </section>
        
        {/* Join Our Community Section */}
        <section className="join-community-section">
          <h2 className="join-community-heading">Join our Community</h2>
          <img
            src={joinCommunityImg}
            alt="Join our community"
            className="join-community-image"
          />
          <Link to="/signup" className="btn join-community-button">Join Now</Link> 

          <p className="join-community-text">
            You’re not alone on this journey. Join a community that supports your goals and celebrates your wins.
            Real people. Real progress. Real productivity — together.
          </p>
        </section>

        {/* Trusted by Teams Section */}
        <section className="teams-trust-section">
            <div className="logos-container">
                {gridItems.map((item, index) => (
                    item.type === 'logo' ? (
                        <div key={index} className={`logo-box ${item.className}`}>
                            <img src={item.src} alt={item.alt} className="logo-image" />
                        </div>
                    ) : (
                        <div key={index} className={`logo-box empty-box ${item.className}`}></div>
                    )
                ))}
            </div>
                
            <h1 className="teams-heading">Trusted by Teams</h1>
            <h1 className="teams-subheading">from various industries</h1>
            <p className="teams-description">
                We're Not Just Building A Task Manager. We're creating a workspace where you can Think clearly, Act confidently and Grow fearlessly
            </p>
        </section>
        
        {/* FOOTER */}
        <footer className="footer">
            <div className="footer-left">
            <img src={footerLogo} alt="Taskify Logo" className="footer-logo" />
            </div>

            <div className="footer-center">
              <div className="footer-column">
                  <a href="https://www.linkedin.com/in/sankalp-mathur-985a171b0/" target="_blank" rel="noopener noreferrer">
                    <h4>LinkedIn</h4>
                  </a>

              </div>
              <div className="footer-column">
                  <a href="https://github.com/SankalpMathur05" target="_blank" rel="noopener noreferrer">
                    <h4>Github</h4>
                  </a>
              </div>
              <div className="footer-column">
                  <a href="https://your-portfolio.com" target="_blank" rel="noopener noreferrer"> 
                    <h4>Portfolio</h4>
                  </a>
              </div>
            </div>

            <div className="footer-right">
            <p className="support-label">Support Inquiries</p>
            <div className="email-row">
                <img src={footerGmail} alt="gmail" className="email-icon" />
                <a href="mailto:sankalpmathur4@gmail.com">
                    <span className="email-text">sankalpmathur4@gmail.com</span>
                </a>
            </div>
            </div>
        </footer>
    </div>
  );
};

export default LandingPage;
