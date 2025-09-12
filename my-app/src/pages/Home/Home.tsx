import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Users, Shield, Leaf } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="flex justify-between items-center p-6 shadow-sm">
        <div className="flex items-center space-x-2">
          <img src="/converted_image.png" alt="Throwly Logo" className="h-10" />
          <h1 className="text-xl font-bold">Throwly</h1>
        </div>
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          <a href="#about" className="hover:text-green-600">About</a>
          <a href="#product" className="hover:text-green-600">Product</a>
          <a href="#community" className="hover:text-green-600">Community</a>
          <a href="#more" className="hover:text-green-600">More</a>
        </nav>
        <div className="space-x-4">
          <Button variant="ghost">Log In</Button>
          <Button className="bg-green-600 text-white">Download App</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-20 bg-gray-50">
        <img src="/Stationary photo" alt="Hero" className="absolute inset-0 object-cover w-full h-full opacity-20" />
        <div className="relative max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            The Future of local e-commerce is Free, Sustainable, & Rewarding
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Welcome to the future of local e-commerce! Picture a world where you can easily access free, reused items through a safe and user-friendly platform that rewards your sustainable choices.
          </p>
          <p className="text-lg text-gray-700 mb-8">
            Earn points redeemable at local thrift stores. Use AI to get personalized recommendations and automate posting with just one image.
          </p>
          <Button size="lg" className="bg-green-600 text-white">Get Started</Button>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-8 px-6 py-16 max-w-6xl mx-auto">
        <Card className="shadow-md">
          <CardContent className="p-6 text-center">
            <Leaf className="mx-auto h-12 w-12 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Sustainability Focus</h3>
            <p className="text-gray-600">We promote reuse and recycling of preloved items, contributing to a sustainable future.</p>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardContent className="p-6 text-center">
            <Users className="mx-auto h-12 w-12 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Free & Rewarding</h3>
            <p className="text-gray-600">Every item is free and accessible. Earn points redeemable at thrift stores and enjoy faster delivery than Amazon.</p>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardContent className="p-6 text-center">
            <Shield className="mx-auto h-12 w-12 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Safety</h3>
            <p className="text-gray-600">Safe and secure e-commerce with a strong emphasis on user safety. Completely free and risk-free.</p>
          </CardContent>
        </Card>
      </section>

      {/* About */}
      <section id="about" className="px-6 py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">About Throwly</h2>
          <p className="text-gray-700 mb-4">Our journey began with a passion for preloved items and a commitment to sustainability. We aim to revolutionize local e-commerce with a safer, rewarding, and environmentally conscious marketplace.</p>
          <p className="text-gray-700 mb-4">Our technology leverages AI to enhance convenience and satisfaction while prioritizing sustainability.</p>
        </div>
      </section>

      {/* Testimonial */}
      <section id="community" className="px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Community Feedback</h2>
          <blockquote className="italic text-lg text-gray-700 mb-6">
            “Throwly's platform has provided me with a safe and rewarding e-commerce experience. I appreciate their commitment to sustainability and user safety.”
          </blockquote>
          <p className="font-semibold">— Customer at Throwly</p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-green-600 text-white text-center py-16">
        <h2 className="text-3xl font-bold mb-4">Join the Movement</h2>
        <p className="mb-6">Experience the future of sustainable e-commerce. Schedule a demo with our team today.</p>
        <Button size="lg" variant="secondary">Get a Demo</Button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 text-center py-6 mt-10">
        <p>© {new Date().getFullYear()} Throwly. All rights reserved.</p>
      </footer>
    </div>
  );
}
