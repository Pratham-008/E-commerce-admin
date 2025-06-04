"use client"
import React, { useState } from 'react'
import Layout from "../component/Layout";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from 'next/image';

const Page = () => {
  const { data: session } = useSession();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  if (!session) {
    return (
      <Layout>
        <div style={{
          maxWidth: '400px',
          margin: '40px auto',
          padding: '32px',
          background: '#fff',
          borderRadius: '12px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          textAlign: 'center'
        }}>
          <h2 style={{ color: '#e00' }}>You are not logged in.</h2>
        </div>
      </Layout>
    );
  }

  const user = session.user;

  return (
    <Layout>
      <div style={{
        maxWidth: '420px',
        margin: '40px auto',
        padding: '36px 32px',
        background: 'linear-gradient(135deg, #f8fafc 60%, #e0e7ff 100%)',
        borderRadius: '18px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
        position: 'relative'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <Image
            src={user.image || "/avatar.svg"}
            alt="Profile"
            style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              objectFit: 'cover',
              marginBottom: '12px',
              border: '3px solid #6366f1',
              background: '#fff'
            }}
          />
          <h2 style={{
            margin: 0,
            color: '#333',
            fontWeight: 700,
            fontSize: '1.5rem'
          }}>{user.name || "No Name"}</h2>
          <span style={{
            color: '#6366f1',
            fontWeight: 500,
            fontSize: '1rem'
          }}>{user.email}</span>
        </div>
        <div style={{
          background: '#fff',
          borderRadius: '10px',
          padding: '18px 20px',
          marginBottom: '24px',
          boxShadow: '0 2px 8px rgba(99,102,241,0.06)'
        }}>
          <div style={{ marginBottom: '12px' }}>
            <strong style={{ color: '#555' }}>User ID:</strong>
            <div style={{ color: '#6366f1', fontWeight: 500 }}>
              {user.id || "N/A"}
            </div>
          </div>
        </div>
        <button
          onClick={async () => {
            await signOut({ redirect: false });
            router.push("/");
          }}
          style={{
            width: '100%',
            padding: '14px',
            background: 'linear-gradient(90deg, #6366f1 60%, #818cf8 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '17px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(99,102,241,0.10)',
            transition: 'background 0.2s'
          }}
        >
          Logout
        </button>
      </div>
    </Layout>
  );
}

export default Page;
