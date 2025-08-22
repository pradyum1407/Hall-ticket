import { useState } from "react";
import { useNavigate } from "react-router";
import { signUp } from "../../lib/api";
import { Eye, EyeOff } from "lucide-react";
import logo from "../../assest/prepbase.png"

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    adminCode: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signUp(formData);
      navigate("/Login");
    } catch (error) {
      setError(error.response?.data?.msg || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="flex flex-col md:flex-row min-h-screen bg-[#242424]">
  {/* Left Side (Form) */}
  <div className="w-full  md:w-1/2 flex justify-center items-stretch  bg-[#242424] min-h-screen md:min-h-0 ">
    <div className="bg-white p-10  md:p-16 rounded-xl shadow-md w-full h-full max-w-xl  ">
      <h2 className="flex  mb-6">
        <img className="w-3xs " src={logo} alt="Logo" />
      </h2>
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input */}
        <div>
          <label className="block mb-1 font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Email Input */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            placeholder="name@gmail.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Password Input */}
        <div>
          <label className="block mb-1 font-medium">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-2 right-3 text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Role Selection */}
        <div>
          <label className="block mb-1 font-medium">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Admin Code (conditional) */}
        {formData.role === "admin" && (
          <div>
            <label className="block mb-1 font-medium">Admin Code</label>
            <input
              type="text"
              name="adminCode"
              placeholder="Enter admin code"
              value={formData.adminCode}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
        )}

        {/* Register Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>

      {/* Login Link */}
      <p className="text-center mt-4 text-sm">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => navigate("/Login")}
          className="text-blue-500 hover:underline"
        >
          Login here
        </button>
      </p>
    </div>
  </div>

  {/* Right Side (Illustration/Text) */}
  <div className="hidden md:flex w-1/2  text-white  flex-col justify-center items-center p-10">
    <h1 className="text-2xl md:text-4xl font-bold mb-4 text-center ">The State of Skills-Based Hiring</h1>
    <p className="text-base md:text-lg  mb-6 max-w-md text-center">
      Our annual report explores the evolution of skills-based hiring in 2025 —
      unpacking the latest trends, challenges, and opportunities shaping the way
      we work and recruit.
    </p>
    <button className="bg-pink-500 text-white px-6 py-3 rounded-lg text-lg">
      Read the Report
    </button>
  </div>
</div>

  );
};

export default Register;
