import styles from './Banner.module.css';
import Card from '../UI/Card/Card';

// Displays Banner/Welcome message to the user
const Banner = () => {
  return (
    <Card className={styles.banner}>
      <h2>Bebek Goyang Sulawesi</h2>
      <div>
        <p>#RajanyaBebek</p>
        <p>
          Kami hadir sebagai kuliner yang khas dengan masakan sulawesi, dibekali
          racikan bumbu yang pas, menu kami memiliki cita rasa yang tinggi
          sehingga siap menggoyang lidah Anda.
        </p>
      </div>
    </Card>
  );
};

export default Banner;
