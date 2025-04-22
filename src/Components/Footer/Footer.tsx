import { OrangeLogo } from "../../Icons/OrangeLogo";

export const Footer = () => {
  return (
    <footer className="bg-[#F0F0F5] py-8 px-6">
      <div className="w-4/5 mx-auto flex flex-col md:flex-row md:justify-between text-gray-700">
        <div className="mb-6 w-1/3">
          <OrangeLogo />
          <p className="text-sm text-gray-500 mt-2 text-body">
            © 2025 Swiggy Limited <br /> This is a clone project for learning
            purposes.
          </p>
        </div>
        <div className="w-2/3 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
          <div>
            <h4 className="font-semibold mb-2">Company</h4>
            <ul className="space-y-1 text-body">
              <li>About Us</li>
              <li>Swiggy Corporate</li>
              <li>Careers</li>
              <li>Team</li>
              <li>Swiggy One</li>
              <li>Swiggy Instamart</li>
              <li>Swiggy Dineout</li>
              <li>Swiggy Genie</li>
              <li>Minis</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Contact Us</h4>
            <ul className="space-y-1 text-body">
              <li>Help & Support</li>
              <li>Partner With Us</li>
              <li>Ride With Us</li>
            </ul>
            <h4 className="font-semibold mt-4 mb-2">Legal</h4>
            <ul className="space-y-1 text-body">
              <li>Terms & Conditions</li>
              <li>Cookie Policy</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Available in:</h4>
            <ul className="space-y-1 text-body">
              <li>Bangalore</li>
              <li>Gurgaon</li>
              <li>Hyderabad</li>
              <li>Delhi</li>
              <li>Mumbai</li>
              <li>Pune</li>
            </ul>
            <button className="mt-2 px-3 py-1 bg-gray-200 rounded text-sm"></button>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Life at Swiggy</h4>
            <ul className="space-y-1 text-body">
              <li>Explore With Swiggy</li>
              <li>Swiggy News</li>
              <li>Snackables</li>
            </ul>

            <h4 className="font-semibold mt-4 mb-2">Social Links</h4>
            <div className="flex space-x-4 text-xl">
              <i className="fab fa-linkedin"></i>
              <i className="fab fa-instagram"></i>
              <i className="fab fa-facebook"></i>
              <i className="fab fa-pinterest"></i>
              <i className="fab fa-twitter"></i>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
