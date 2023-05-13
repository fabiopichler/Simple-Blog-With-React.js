import { faLink, faUsers } from '@fortawesome/free-solid-svg-icons';
import {
    faFacebook,
    faGithub,
    faInstagram,
    faLinkedin,
    faMastodon,
    faTwitter,
    faYoutube
} from '@fortawesome/free-brands-svg-icons';

import { SidebarSection } from '../../../../components/sidebarSection/SidebarSection';
import { SocialLinks } from '../../../../components/socialLinks/SocialLinks';
import { LastPosts } from './lastPosts/LastPosts';

export const AppSidebar: React.FC = () => (
    <>
        <SidebarSection
            title="Redes Sociais"
            icon={faUsers}
        >
            <SocialLinks
                className="social d-flex flex-column fw-bold"
                children={[
                    {
                        title: 'Mastodon',
                        link: 'https://mastodon.social',
                        description: 'Perfil no Mastodon',
                        icon: faMastodon,
                        iconClass: 'mastodon',
                    }, {
                        title: 'Twitter',
                        link: 'https://twitter.com',
                        description: 'Perfil no Twitter',
                        icon: faTwitter,
                        iconClass: 'twitter',
                    }, {
                        title: 'GitHub',
                        link: 'https://github.com',
                        description: 'Perfil no GitHub',
                        icon: faGithub,
                        iconClass: 'github',
                    }, {
                        title: 'LinkedIn',
                        link: 'https://www.linkedin.com',
                        description: 'Perfil no LinkedIn',
                        icon: faLinkedin,
                        iconClass: 'linkedin',
                    }, {
                        title: 'Instagram',
                        link: 'https://www.instagram.com',
                        description: 'Perfil no Instagram',
                        icon: faInstagram,
                        iconClass: 'instagram',
                    }, {
                        title: 'Facebook',
                        link: 'https://www.facebook.com',
                        description: 'Perfil no Facebook',
                        icon: faFacebook,
                        iconClass: 'facebook',
                    }, {
                        title: 'YouTube',
                        link: 'https://www.youtube.com',
                        description: 'Perfil no YouTube',
                        icon: faYoutube,
                        iconClass: 'youtube',
                    },
                ]}
            />
        </SidebarSection>

        <LastPosts />

        <SidebarSection
            title="Links Recomendados"
            icon={faLink}
            bodyClass="text-secondary"
        >
            » <a href="https://fabiopichler.net" rel="nofollow me" target="_blank">Fábio Pichler</a>
            <br />
            » <a href="https://openjdk.org" rel="nofollow" target="_blank">OpenJDK</a>
            <br />
            » <a href="https://spring.io" rel="nofollow" target="_blank">Spring Boot</a>
            <br />
            » <a href="https://start.spring.io" rel="nofollow" target="_blank">Spring Initializr</a>
            <br />
            » <a href="https://www.thymeleaf.org" rel="nofollow" target="_blank">Thymeleaf</a>
        </SidebarSection>
    </>
);
