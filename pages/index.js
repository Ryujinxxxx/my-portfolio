import ContactForm from "../src/components/ContactForm";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "Network Automation Project",
      description:
        "Developed a Python-based automation system to perform network diagnostics, configuration backups, and device monitoring. Streamlined repetitive workflows and ensured network reliability across multi-vendor environments.",
      tech: ["Python", "Cisco CLI", "FortiGate", "Ansible"],
      image: "/network_automation.jpg",
    },
    {
      id: 2,
      title: "Network Monitoring Dashboard",
      description:
        "Built a live dashboard using React and REST APIs to visualize latency, uptime, and throughput metrics. Improved NOC operational efficiency and issue resolution with real-time data insights.",
      tech: ["React", "Node.js", "REST API", "Grafana"],
      image: "/dashboard.png",
    },
    {
      id: 3,
      title: "Secure VPN Deployment",
      description:
        "Implemented a high-availability VPN infrastructure using FortiGate and IPSec. Designed routing and encryption configurations for secure access and optimized performance for distributed teams.",
      tech: ["FortiGate", "IPSec", "OpenVPN", "Routing"],
      image: "/vpn.png",
    },
    {
      id: 4,
      title: "Personal Portfolio Website",
      description:
        "Created a responsive and dynamic portfolio using Next.js, Tailwind CSS, and Framer Motion. Showcases professional projects with animations and a clean modern UI design.",
      tech: ["Next.js", "Tailwind CSS", "Framer Motion", "JavaScript"],
      image: "/portfolio.png",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans scroll-smooth">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-40 backdrop-blur-sm z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Image
              src="/logo.jpeg"
              alt="Logo"
              width={45}
              height={45}
              className="rounded-full border border-gray-600"
            />
            <h1 className="text-lg font-semibold">Fahmie’s Portfolio</h1>
          </div>
          <div className="space-x-6 text-sm">
            <Link href="#home" className="hover:text-blue-400 transition">
              Home
            </Link>
            <Link href="#about" className="hover:text-blue-400 transition">
              About
            </Link>
            <Link href="#projects" className="hover:text-blue-400 transition">
              Projects
            </Link>
            <Link href="#contact" className="hover:text-blue-400 transition">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative flex items-center justify-center h-screen overflow-hidden"
      >
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8 }}
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/banner.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-gray-900/90"></div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3 }}
          className="relative z-10 text-center px-6"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Hello, I’m Fahmie 👋
          </h1>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-gray-200 leading-relaxed">
            Network Engineer passionate about{" "}
            <span className="text-blue-400 font-semibold">automation</span>,{" "}
            <span className="text-blue-400 font-semibold">cybersecurity</span>, and{" "}
            <span className="text-blue-400 font-semibold">network innovation</span>.
          </p>
          <Link
            href="#projects"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-10 rounded-full shadow-lg hover:shadow-blue-500/30 transition duration-300"
          >
            View My Work
          </Link>
        </motion.div>
      </section>

      {/* About */}
      <section id="about" className="py-24 bg-gray-950 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-6"
        >
          About Me
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
          viewport={{ once: true }}
          className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed"
        >
          I’m a results-driven Network Engineer with experience in troubleshooting, security, and
          automation. Skilled in network configuration, Python scripting, and system optimization,
          I thrive on improving connectivity and efficiency in every project I take on.
        </motion.p>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24 bg-gray-900">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12">Featured Projects</h2>
          <div className="grid md:grid-cols-2 gap-10">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedProject(project)}
                className="cursor-pointer bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-blue-500/20 transition"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  width={500}
                  height={300}
                  className="rounded-lg mb-4 object-cover"
                />
                <h3 className="text-2xl font-semibold mb-4 text-blue-400">{project.title}</h3>
                <p className="text-gray-300 line-clamp-3">{project.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-900 rounded-2xl max-w-2xl w-full p-8 relative shadow-xl"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
              >
                ✖
              </button>
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                width={700}
                height={400}
                className="rounded-lg mb-6 object-cover"
              />
              <h3 className="text-3xl font-semibold mb-4 text-blue-400">
                {selectedProject.title}
              </h3>
              <p className="text-gray-300 mb-6">{selectedProject.description}</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {selectedProject.tech.map((t, i) => (
                  <span
                    key={i}
                    className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact */}
      <section id="contact" className="py-20 bg-gray-950 text-center">
        <h2 className="text-4xl font-bold mb-6">Get In Touch</h2>
        <p className="text-gray-400 mb-8">
          I’m open to opportunities, collaborations, and freelance projects.
        </p>

        {/* New Contact Form (client-side mailto fallback) */}
        <div className="max-w-lg mx-auto">
          <ContactForm />
          <div className="mt-6">
            <Link
              href="mailto:fahmie@example.com"
              className="text-sm text-gray-400 hover:text-gray-200"
            >
              Or email me directly: mfahmiebasri@gmail.com
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-center py-6 text-gray-500 text-sm">
        © {new Date().getFullYear()} Fahmie — Built with ❤️ using Next.js & Tailwind CSS
      </footer>
    </div>
  );
}
