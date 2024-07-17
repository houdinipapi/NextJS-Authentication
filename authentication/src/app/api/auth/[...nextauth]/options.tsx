import React from 'react'
import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"


export const options = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID ?? '',
            clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',

            profile(profile) {
                console.log("GitHub Profle: ", profile)

                let userRole = "GitHub User"
                if (profile?.email === "ochiengcliff.co@gmail.com"){
                    userRole = "admin";
                }

                return {
                    ...profile,
                    id: profile.id.toString(),
                    role: userRole,
                };
            },
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        
            profile(profile) {
                console.log("Google Profle: ", profile)
        
                let userRole = "Google User"
                if (profile?.email == "olivertim.ot@gmail.com"){
                    userRole = "admin";
                }
        
                return {
                    ...profile,
                    id: profile.sub,
                    role: userRole,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({token, user}: {token: any, user: any}) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session({session, token}: {session: any, token: any}) {
            if (session?.user){
                session.user.id = token.id;
                session.user.role = token.role;

                console.log(session.user.role)
            }
            return session;
            // session.id = token.id;
            // session.role = token.role;
            // return session;
        },
    }
};


export default NextAuth(options);