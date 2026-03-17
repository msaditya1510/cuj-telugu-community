// import { useEffect, useState, useCallback, useMemo } from "react"
// import { Layout } from "@/components/layout/Layout"
// import { Card } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { useNavigate } from "react-router-dom"
// import { 
//   MapPin, 
//   Search, 
//   X, 
//   Filter,
//   Loader2,
//   ChevronDown,
//   Building2,
//   GraduationCap,
//   Briefcase,
//   Users
// } from "lucide-react"

// const API_BASE = import.meta.env.VITE_API_URL

// interface UserCard {
//   id: number
//   name: string
//   preferredName: string
//   photoUrl: string | null
//   department: string
//   userType: string
//   address?: {
//     city: string
//     state: string
//     district: string
//   }
// }

// // Simple role icons mapping
// const roleIcons = {
//   STUDENT: GraduationCap,
//   PROFESSOR: Briefcase,
//   ALUMNI: Users,
//   DEFAULT: Building2
// }

// export default function ContactCardsPage() {
//   const navigate = useNavigate()
//   const [users, setUsers] = useState<UserCard[]>([])
//   const [name, setName] = useState("")
//   const [department, setDepartment] = useState("")
//   const [type, setType] = useState("")
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   // Clean avatar generator
//   const getAvatar = useCallback((user: UserCard) => {
//     if (user.photoUrl) return user.photoUrl
//     const name = encodeURIComponent(user.preferredName || user.name)
//     return `https://ui-avatars.com/api/?name=${name}&background=4B5563&color=fff&size=256&bold=true`
//   }, [])

//   // Fetch function
//   const fetchUsers = useCallback(async () => {
//     setLoading(true)
//     setError(null)
    
//     try {
//       let url = `${API_BASE}/api/contact-cards/search`
//       const params = new URLSearchParams()

//       if (name) params.append("name", name)
//       if (department) params.append("department", department)
//       if (type) params.append("type", type)

//       if (params.toString()) {
//         url += `?${params.toString()}`
//       }

//       const res = await fetch(url, { credentials: "include" })
      
//       if (!res.ok) {
//         throw new Error(`Failed to fetch users`)
//       }
      
//       const data = await res.json()
//       setUsers(Array.isArray(data) ? data : [])
//     } catch (err) {
//       setError("Failed to load users")
//       console.error("Error fetching users:", err)
//     } finally {
//       setLoading(false)
//     }
//   }, [name, department, type])

//   useEffect(() => {
//     fetchUsers()
//   }, [])

//   // Debounced search
//   useEffect(() => {
//     const delay = setTimeout(() => {
//       fetchUsers()
//     }, 400)

//     return () => clearTimeout(delay)
//   }, [name, department, type, fetchUsers])

//   const clearFilters = () => {
//     setName("")
//     setDepartment("")
//     setType("")
//   }

//   const hasActiveFilters = useMemo(() => {
//     return name || department || type
//   }, [name, department, type])

//   const getRoleIcon = (userType: string) => {
//     const Icon = roleIcons[userType as keyof typeof roleIcons] || roleIcons.DEFAULT
//     return <Icon size={14} className="text-gray-500" />
//   }

//   const formatLocation = (address?: UserCard['address']) => {
//     if (!address) return null
//     const parts = [address.city, address.district, address.state].filter(Boolean)
//     return parts.join(", ")
//   }

//   return (
//     <Layout>
//       <div className="min-h-screen bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          
//           {/* Header */}
//           <div className="mb-8">
//             <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 tracking-tight">
//               Community Directory
//             </h1>
//             <p className="mt-2 text-base text-gray-500">
//               Find and connect with members of the CUJ Telugu community
//             </p>
//           </div>

//           {/* Filters */}
//           <div className="mb-8 space-y-4">
//             <div className="flex flex-col sm:flex-row gap-3">
//               <div className="flex-1 relative">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                 <Input
//                   placeholder="Search by name..."
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   className="pl-10 h-11 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
//                 />
//               </div>

//               <div className="flex-1">
//                 <Input
//                   placeholder="Department"
//                   value={department}
//                   onChange={(e) => setDepartment(e.target.value)}
//                   className="h-11 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
//                 />
//               </div>

//               <div className="flex gap-2">
//                 <select
//                   value={type}
//                   onChange={(e) => setType(e.target.value)}
//                   className="h-11 px-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition-colors"
//                 >
//                   <option value="">All roles</option>
//                   <option value="STUDENT">Student</option>
//                   <option value="PROFESSOR">Professor</option>
//                   <option value="ALUMNI">Alumni</option>
//                 </select>

//                 {hasActiveFilters && (
//                   <button
//                     onClick={clearFilters}
//                     className="px-3 h-11 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-500 hover:text-gray-700"
//                     title="Clear filters"
//                   >
//                     <X size={18} />
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* Active filters */}
//             {hasActiveFilters && (
//               <div className="flex flex-wrap gap-2">
//                 {name && (
//                   <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-md">
//                     <span>Name: {name}</span>
//                     <button onClick={() => setName("")} className="hover:text-gray-900">
//                       <X size={14} />
//                     </button>
//                   </span>
//                 )}
//                 {department && (
//                   <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-md">
//                     <span>Dept: {department}</span>
//                     <button onClick={() => setDepartment("")} className="hover:text-gray-900">
//                       <X size={14} />
//                     </button>
//                   </span>
//                 )}
//                 {type && (
//                   <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-md">
//                     <span>Role: {type.toLowerCase()}</span>
//                     <button onClick={() => setType("")} className="hover:text-gray-900">
//                       <X size={14} />
//                     </button>
//                   </span>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Results count */}
//           {!loading && !error && users.length > 0 && (
//             <div className="mb-4 text-sm text-gray-500">
//               {users.length} {users.length === 1 ? 'member' : 'members'}
//             </div>
//           )}

//           {/* Loading */}
//           {loading && (
//             <div className="flex justify-center items-center py-20">
//               <Loader2 className="animate-spin text-gray-400" size={32} />
//             </div>
//           )}

//           {/* Error */}
//           {error && !loading && (
//             <div className="text-center py-12">
//               <p className="text-gray-500 mb-3">{error}</p>
//               <button 
//                 onClick={fetchUsers}
//                 className="text-sm text-gray-600 hover:text-gray-900 underline underline-offset-4"
//               >
//                 Try again
//               </button>
//             </div>
//           )}

//           {/* Empty state */}
//           {!loading && !error && users.length === 0 && (
//             <div className="text-center py-12">
//               <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
//                 <Users size={24} className="text-gray-400" />
//               </div>
//               <p className="text-gray-600 font-medium">No members found</p>
//               <p className="text-sm text-gray-500 mt-1">Try adjusting your filters</p>
//               {hasActiveFilters && (
//                 <button
//                   onClick={clearFilters}
//                   className="mt-4 text-sm text-gray-600 hover:text-gray-900 underline underline-offset-4"
//                 >
//                   Clear all filters
//                 </button>
//               )}
//             </div>
//           )}

//           {/* Cards grid */}
//           {!loading && !error && users.length > 0 && (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {users.map((user) => {
//                 const RoleIcon = getRoleIcon(user.userType)
//                 const location = formatLocation(user.address)
                
//                 return (
//                   <Card
//                     key={user.id}
//                     className="group cursor-pointer border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200"
//                     onClick={() => navigate(`/profile/${user.id}`)}
//                   >
//                     <div className="p-5">
//                       <div className="flex items-start gap-4">
//                         {/* Avatar */}
//                         <img
//                           src={getAvatar(user)}
//                           alt={user.preferredName || user.name}
//                           className="w-16 h-16 rounded-full object-cover border border-gray-200 flex-shrink-0"
//                           loading="lazy"
//                         />

//                         {/* Info */}
//                         <div className="flex-1 min-w-0">
//                           <h2 className="font-medium text-gray-900 truncate">
//                             {user.preferredName || user.name}
//                           </h2>
                          
//                           <div className="flex items-center gap-1.5 mt-1">
//                             {RoleIcon}
//                             <span className="text-xs text-gray-500">
//                               {user.userType.toLowerCase()}
//                             </span>
//                           </div>

//                           <div className="mt-2 text-sm text-gray-600 truncate">
//                             {user.department || "Department not specified"}
//                           </div>

//                           {location && (
//                             <div className="flex items-center gap-1.5 mt-1 text-xs text-gray-400">
//                               <MapPin size={12} />
//                               <span className="truncate">{location}</span>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </Card>
//                 )
//               })}
//             </div>
//           )}
//         </div>
//       </div>
//     </Layout>
//   )
// }


// large cards
import { useEffect, useState, useCallback, useMemo } from "react"
import { Layout } from "@/components/layout/Layout"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"
import { 
  MapPin, 
  Search, 
  X, 
  Filter,
  Loader2,
  ChevronDown,
  Building2,
  GraduationCap,
  Briefcase,
  Users
} from "lucide-react"

const API_BASE = import.meta.env.VITE_API_URL

interface UserCard {
  id: number
  name: string
  preferredName: string
  photoUrl: string | null
  department: string
  userType: string
  address?: {
    city: string
    state: string
    district: string
  }
}

// Simple role icons mapping
const roleIcons = {
  STUDENT: GraduationCap,
  PROFESSOR: Briefcase,
  ALUMNI: Users,
  DEFAULT: Building2
}

export default function ContactCardsPage() {
  useEffect(()=>{
document.title = "Community Directory | CUJ Telugu Community"
},[])
  const navigate = useNavigate()
  const [users, setUsers] = useState<UserCard[]>([])
  const [name, setName] = useState("")
  const [department, setDepartment] = useState("")
  const [type, setType] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Clean avatar generator with better contrast
  const getAvatar = useCallback((user: UserCard) => {
    if (user.photoUrl) return user.photoUrl
    const name = encodeURIComponent(user.preferredName || user.name)
    // Using a softer gray that matches the gradient aesthetic
    return `https://ui-avatars.com/api/?name=${name}&background=334155&color=fff&size=256&bold=true&length=2`
  }, [])

  // Fetch function
  const fetchUsers = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      let url = `${API_BASE}/api/contact-cards/search`
      const params = new URLSearchParams()

      if (name) params.append("name", name)
      if (department) params.append("department", department)
      if (type) params.append("type", type)

      if (params.toString()) {
        url += `?${params.toString()}`
      }

      const res = await fetch(url, { credentials: "include" })
      
      if (!res.ok) {
        throw new Error(`Failed to fetch users`)
      }
      
      const data = await res.json()
      setUsers(Array.isArray(data) ? data : [])
    } catch (err) {
      setError("Failed to load users")
      console.error("Error fetching users:", err)
    } finally {
      setLoading(false)
    }
  }, [name, department, type])

  useEffect(() => {
    fetchUsers()
  }, [])

  // Debounced search
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchUsers()
    }, 400)

    return () => clearTimeout(delay)
  }, [name, department, type, fetchUsers])

  const clearFilters = () => {
    setName("")
    setDepartment("")
    setType("")
  }

  const hasActiveFilters = useMemo(() => {
    return name || department || type
  }, [name, department, type])

  const getRoleIcon = (userType: string) => {
    const Icon = roleIcons[userType as keyof typeof roleIcons] || roleIcons.DEFAULT
    return <Icon size={16} className="text-gray-500" />
  }

  // Format location to show only city and state
  const formatLocation = (address?: UserCard['address']) => {
    if (!address?.city && !address?.state) return null
    const parts = [address.city, address.state].filter(Boolean)
    return parts.join(", ")
  }

  return (
    <Layout>
      {/* Gradient background matching home page */}
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          
          {/* Centered Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent tracking-tight">
              Community Directory
            </h1>
            <p className="mt-3 text-lg text-slate-500 max-w-2xl mx-auto">
              Find and connect with members of the CUJ Telugu community
            </p>
            
            {/* Subtle decorative line */}
            <div className="mt-6 flex justify-center">
              <div className="w-16 h-1 bg-gradient-to-r from-slate-300 to-slate-200 rounded-full"></div>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <Input
                  placeholder="Search by name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 h-12 bg-white border-slate-200 focus:border-slate-300 focus:ring-slate-200 transition-colors"
                />
              </div>

              <div className="flex-1">
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="h-12 bg-white border-slate-200 focus:border-slate-300 focus:ring-slate-200 transition-colors w-full border rounded-md p-2"
                >
                  <option value="">Select Department</option>
<option value="Anthropology and Tribal Studies">Anthropology and Tribal Studies</option>
<option value="Business Administration">Business Administration</option>
<option value="Civil Engineering">Civil Engineering</option>
<option value="Computer Science and Engineering">Computer Science and Engineering</option>
<option value="Commerce and Financial Studies">Commerce and Financial Studies</option>
<option value="Chemistry">Chemistry</option>
<option value="Environmental Science">Environmental Science</option>
<option value="Economics & Development Studies">Economics & Development Studies</option>
<option value="Electrical Engineering">Electrical Engineering</option>
<option value="Education">Education</option>
<option value="English Studies">English Studies</option>
<option value="Far East Languages">Far East Languages</option>
<option value="Geoinformatics">Geoinformatics</option>
<option value="Geography">Geography</option>
<option value="Geology">Geology</option>
<option value="Happiness and Holistic Well-Being">Happiness and Holistic Well-Being</option>
<option value="Hindi">Hindi</option>
<option value="International Relations">International Relations</option>
<option value="Life Sciences">Life Sciences</option>
<option value="Mass Communication">Mass Communication</option>
<option value="Mathematics">Mathematics</option>
<option value="Metallurgical and Materials Engineering">Metallurgical and Materials Engineering</option>
<option value="Political Science & Public Administration">Political Science & Public Administration</option>
<option value="Physics">Physics</option>
<option value="Performing Arts">Performing Arts</option>
<option value="Statistics">Statistics</option>
</select>
              </div>

              <div className="flex gap-2">
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="h-12 px-4 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-300 transition-colors min-w-[140px]"
                >
                  <option value="">All roles</option>
                  <option value="STUDENT">STUDENT</option>
                  <option value="PROFESSOR">PROFESSOR</option>
                  <option value="ALUMNI">ALUMNI</option>
                </select>

                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="px-3 h-12 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-slate-500 hover:text-slate-700"
                    title="Clear filters"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            </div>

            {/* Active filters */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2">
                {name && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 text-sm rounded-md">
                    <span>Name: {name}</span>
                    <button onClick={() => setName("")} className="hover:text-slate-900">
                      <X size={14} />
                    </button>
                  </span>
                )}
                {department && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 text-sm rounded-md">
                    <span>Dept: {department}</span>
                    <button onClick={() => setDepartment("")} className="hover:text-slate-900">
                      <X size={14} />
                    </button>
                  </span>
                )}
                {type && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 text-sm rounded-md">
                    <span>Role: {type}</span>
                    <button onClick={() => setType("")} className="hover:text-slate-900">
                      <X size={14} />
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Results count */}
          {!loading && !error && users.length > 0 && (
            <div className="mb-4 text-sm text-slate-500">
              {users.length} {users.length === 1 ? 'member' : 'members'}
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="animate-spin text-slate-400" size={32} />
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="text-center py-12">
              <p className="text-slate-500 mb-3">{error}</p>
              <button 
                onClick={fetchUsers}
                className="text-sm text-slate-600 hover:text-slate-900 underline underline-offset-4"
              >
                Try again
              </button>
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && users.length === 0 && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
                <Users size={24} className="text-slate-400" />
              </div>
              <p className="text-slate-600 font-medium">No members found</p>
              <p className="text-sm text-slate-500 mt-1">Try adjusting your filters</p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="mt-4 text-sm text-slate-600 hover:text-slate-900 underline underline-offset-4"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}

          {/* Cards grid */}
          {!loading && !error && users.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {users.map((user) => {
                const RoleIcon = getRoleIcon(user.userType)
                const location = formatLocation(user.address)
                
                return (
                  <Card
                    key={user.id}
                    className="group cursor-pointer border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200 overflow-hidden"
                    onClick={() => navigate(`/profile/${user.id}`)}
                  >
                    <div className="p-6">
                      <div className="flex flex-col items-center text-center">
                        {/* Avatar - Larger size for better visibility */}
                        <div className="mb-4">
                          <img
                            src={getAvatar(user)}
                            alt={user.preferredName || user.name}
                            className="w-24 h-24 rounded-full object-cover border-2 border-slate-100 shadow-sm"
                            loading="lazy"
                          />
                        </div>

                        {/* Info */}
                        <div className="space-y-2 w-full">
                          <h2 className="font-semibold text-lg text-slate-900">
                            {user.preferredName || user.name}
                          </h2>
                          
                          <div className="flex items-center justify-center gap-1.5">
                            {RoleIcon}
                            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                              {user.userType}
                            </span>
                          </div>

                          <div className="text-sm text-slate-600">
                            {user.department || "Department not specified"}
                          </div>

                          {location && (
                            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400">
                              <MapPin size={12} />
                              <span>{location}</span>
                            </div>
                          )}

                          {/* Subtle view profile indicator */}
                          <div className="pt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <span className="text-xs text-slate-400">View profile →</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}