// // src/app/category/page.tsx
// 'use client';

// import { Navbar } from '@/components/layout/Navbar/Navbar';
// import { Footer } from '@/components/layout/Footer';
// import { useCategories } from '@/lib/hooks/useNews';
// import { useNewsStore } from '@/store/news-store';
// import { mockCategories } from '@/lib/mock-data';
// import Link from 'next/link';
// import { Users, CheckCircle2, TrendingUp } from 'lucide-react';

// export default function CategoriesPage() {
//   const { categories, loading } = useCategories();
//   const { preferences, followCategory, unfollowCategory } = useNewsStore();

//   return (
//     <>
//       <Navbar />
//       <main className="pt-14">
//         <div className="max-w-screen-xl mx-auto px-4 py-12">
//           <div className="text-center mb-10">
//             <h1 className="text-4xl font-black mb-3" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--text-primary)' }}>
//               Browse Categories
//             </h1>
//             <p className="text-base" style={{ color: 'var(--text-muted)' }}>
//               Follow topics that matter to you for a personalized feed
//             </p>
//           </div>

//            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"> 
//           {/* <div className='space-y-8'> */}
//             {categories.map((cat) => {
//               const isFollowing = preferences.followedCategories.includes(cat.id);
//               return (
//                 <div key={cat.id} className="card rounded-2xl overflow-hidden hover:shadow-lg transition-all group">
//                   {/* Color header */}
//                   <div className="h-24 flex items-center justify-center relative overflow-hidden"
//                     style={{ background: `linear-gradient(135deg, ${cat.color}20, ${cat.color}40)` }}>
//                     <span className="text-5xl group-hover:scale-110 transition-transform duration-300">{cat.icon}</span>
//                     <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
//                       style={{ background: `radial-gradient(circle at center, ${cat.color}15, transparent 70%)` }} />
//                   </div>

//                   <div className="p-4">
//                     <div className="flex items-center justify-between mb-1">
//                       <h3 className="font-bold text-lg" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--text-primary)' }}>
//                         {cat.name}
//                       </h3>
//                       {isFollowing && <CheckCircle2 size={16} style={{ color: cat.color }} />}
//                     </div>
//                     <div className="flex items-center gap-2 text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
//                       <span className="flex items-center gap-1"><TrendingUp size={12} />{cat.count} stories</span>
//                     </div>
//                     <div className="flex gap-2">
//                       <Link
//                         href={`/category/${cat.slug}`}
//                         className="flex-1 text-center py-2 rounded-lg text-sm font-semibold border transition-all hover:opacity-80"
//                         style={{ borderColor: cat.color, color: cat.color }}
//                       >
//                         Browse
//                       </Link>
//                       <button
//                         onClick={() => isFollowing ? unfollowCategory(cat.id) : followCategory(cat.id)}
//                         className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
//                         style={{ background: isFollowing ? '#6b7280' : cat.color }}
//                       >
//                         <Users size={13} />
//                         {isFollowing ? 'Following' : 'Follow'}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </>
//   );
// }






// src/app/category/page.tsx
'use client';

import { Navbar } from '@/components/layout/Navbar/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useCategories } from '@/lib/hooks/useNews';
import { useNewsStore } from '@/store/news-store';
import Link from 'next/link';
import {
  Users,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';

export default function CategoriesPage() {
  const { categories, loading } = useCategories();

  const {
    preferences,
    followCategory,
    unfollowCategory,
  } = useNewsStore();

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="pt-14 min-h-screen">
          <div className="max-w-screen-xl mx-auto px-4 py-12">
            <div className="text-center">
              <h1
                className="text-4xl font-black mb-3"
                style={{
                  fontFamily: 'var(--font-playfair)',
                  color: 'var(--text-primary)',
                }}
              >
                Loading Categories...
              </h1>
            </div>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="pt-14 min-h-screen bg-[var(--bg-primary)]">
        <div className="max-w-screen-xl mx-auto px-4 py-12">

          {/* Hero Section */}
          <section className="w-full mb-12 text-center">
            <div className="max-w-3xl mx-auto">
              <h1
                className="text-4xl md:text-5xl font-black mb-4"
                style={{
                  fontFamily: 'var(--font-playfair)',
                  color: 'var(--text-primary)',
                }}
              >
                Browse Categories
              </h1>

              <p
                className="text-base md:text-lg"
                style={{ color: 'var(--text-muted)' }}
              >
                Follow topics that matter to you for a
                personalized news experience
              </p>
            </div>
          </section>

          {/* Categories Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((cat) => {
              const isFollowing =
                preferences.followedCategories.includes(
                  cat.id
                );

              return (
                <div
                  key={cat.id}
                  className="card rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--bg-card)] hover:shadow-xl transition-all duration-300 group"
                >
                  {/* Top Gradient Header */}
                  <div
                    className="h-28 flex items-center justify-center relative overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${cat.color}20, ${cat.color}40)`,
                    }}
                  >
                    <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
                      {cat.icon}
                    </span>

                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(circle at center, ${cat.color}20, transparent 70%)`,
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Title */}
                    <div className="flex items-center justify-between mb-2">
                      <h2
                        className="font-bold text-xl truncate"
                        style={{
                          fontFamily:
                            'var(--font-playfair)',
                          color:
                            'var(--text-primary)',
                        }}
                      >
                        {cat.name}
                      </h2>

                      {isFollowing && (
                        <CheckCircle2
                          size={18}
                          style={{ color: cat.color }}
                        />
                      )}
                    </div>

                    {/* Stats */}
                    <div
                      className="flex items-center gap-2 text-sm mb-5"
                      style={{
                        color: 'var(--text-muted)',
                      }}
                    >
                      <span className="flex items-center gap-1">
                        <TrendingUp size={13} />
                        {cat.count} stories
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Link
                        href={`/category/${cat.slug}`}
                        className="flex-1 text-center py-2.5 rounded-xl text-sm font-semibold border transition-all hover:opacity-80"
                        style={{
                          borderColor: cat.color,
                          color: cat.color,
                        }}
                      >
                        Browse
                      </Link>

                      <button
                        onClick={() =>
                          isFollowing
                            ? unfollowCategory(cat.id)
                            : followCategory(cat.id)
                        }
                        className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                        style={{
                          background: isFollowing
                            ? '#6b7280'
                            : cat.color,
                        }}
                      >
                        <Users size={14} />

                        {isFollowing
                          ? 'Following'
                          : 'Follow'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
