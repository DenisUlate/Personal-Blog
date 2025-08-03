import { Github, Linkedin, Twitter, Mail } from "lucide-react";

const SocialLinks = () => {
	const socialLinksData = [
		{
			name: "GitHub",
			url: "https://github.com/DenisUlate",
			icon: Github,
			ariaLabel: "Visit my GitHub profile",
		},
		{
			name: "LinkedIn",
			url: "https://linkedin.com/in/tuusuario",
			icon: Linkedin,
			ariaLabel: "Connect with me on LinkedIn",
		},
		{
			name: "Twitter",
			url: "https://x.com/Dennis_Ulate",
			icon: Twitter,
			ariaLabel: "Follow me on Twitter",
		},
		{
			name: "Email",
			url: "mailto:dennisjose.us@gmail.com",
			icon: Mail,
			ariaLabel: "Send me an email",
		},
	];

	return (
		<div className="flex items-center gap-3">
			{socialLinksData.map((social) => (
				<a
					key={social.name}
					href={social.url}
					target="_blank"
					rel="noopener noreferrer"
					aria-label={social.ariaLabel}
					className="
                    p-2 
                    bg-card 
                    border 
                    border-border
                    shadow-sm 
                    hover:shadow-md
                    hover:bg-primary 
                    text-foreground 
                    hover:text-primary-foreground 
                    rounded-full 
                    transition-colors 
                    duration-200
                ">
					<social.icon size={20} />
				</a>
			))}
		</div>
	);
};
export default SocialLinks;
