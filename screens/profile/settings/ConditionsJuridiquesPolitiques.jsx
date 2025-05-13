import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/MaterialIcons";


const ConditionsJuridiquesPolitiques = () => {
  const navigation = useNavigation()
  useLayoutEffect(() => {
    // place the name of the App on right corner, the notification icon on left corner and the search bar bellow them
    navigation.setOptions({
      headerTitle: () => (<View
        style={{ marginLeft: 30 }}
      >
        <Text style={{ color: "#FF9900", fontSize: 18 }}>Termes et Conditions</Text>
      </View>),
      headerStyle: {
        backgroundColor: "white",
        borderBottomColor: "transparent",
        shadowColor: "transparent"
      },
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 20,
      },
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10, }}>
          <Icon name="arrow-back" size={24} color="#FF9900" />
        </TouchableOpacity>
      ),


    });
  }, [navigation]);

  const termesAndConditions = ""
  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.mainTitle}>Conditions Générales d’Utilisation et de Vente (CGUV)</Text>

      <View style={styles.container}>


        <View style={styles.subContainer}>
          <Text style={styles.subTitle}>1. Préambule</Text>
          <Text style={styles.text}>
            Les présentes Conditions Générales d’Utilisation et de Vente (ci-après « les Conditions ») régissent l’utilisation de
            l’application e-commerce (ci-après « l’Application ») proposée par [Nom de votre entreprise], immatriculée au Niger,
            et accessible à tous les utilisateurs (ci-après « l’Utilisateur »).
          </Text>
        </View>

        <View style={styles.subContainer}>
          <Text style={styles.subTitle}>2. Acceptation des Conditions</Text>
          <Text style={styles.text}>
            En accédant à l’Application, vous acceptez sans réserve les présentes Conditions. Si vous refusez tout ou partie de celles-ci,
            vous ne devez pas utiliser l’Application.
          </Text>
        </View>

        <View style={styles.subContainer}>
          <Text style={styles.subTitle}>3. Objet</Text>
          <Text style={styles.text}>
            L’Application permet aux utilisateurs de consulter, commander et acheter des produits proposés à la vente en ligne.
          </Text>
        </View>

        <View style={styles.subContainer}>
          <Text style={styles.subTitle}>4. Création de compte</Text>
          <Text style={styles.text}>
            L’utilisateur doit fournir des informations exactes, complètes et à jour. Il est responsable de la confidentialité
            de ses identifiants et de toute activité effectuée depuis son compte.
          </Text>
        </View>

        <View style={styles.subContainer}>
          <Text style={styles.subTitle}>5. Commandes</Text>
          <Text style={styles.text}>
            Toute commande passée via l’Application constitue une acceptation des prix et descriptions des produits disponibles.
            L’entreprise se réserve le droit de refuser ou d’annuler une commande en cas de litige, fraude ou erreur manifeste.
          </Text>
        </View>

        <View style={styles.subContainer}>
          <Text style={styles.subTitle}>6. Prix et Paiement</Text>
          <Text style={styles.text}>
            Les prix sont indiqués en francs CFA (XOF), toutes taxes comprises (TTC). Le paiement s’effectue par les moyens
            proposés sur l’Application (Mobile Money, carte bancaire, etc.) via des plateformes sécurisées.
          </Text>
        </View>

        <View style={styles.subContainer}>
          <Text style={styles.subTitle}>7. Livraison</Text>
          <Text style={styles.text}>
            Les livraisons sont effectuées à l’adresse indiquée par l’utilisateur. Les délais de livraison sont indicatifs.
            Aucun remboursement ne pourra être exigé en cas de retard, sauf dispositions prévues par la loi.
          </Text>
        </View>

        <View style={styles.subContainer}>
          <Text style={styles.subTitle}>8. Droit de rétractation</Text>
          <Text style={styles.text}>
            Conformément à la réglementation applicable, l’utilisateur peut exercer son droit de rétractation dans un délai
            de 7 jours à compter de la réception de la commande, sauf exceptions (produits périssables, personnalisés, etc.).
            Les frais de retour sont à la charge de l’utilisateur.
          </Text>
        </View>

        <View style={styles.subContainer}>
          <Text style={styles.subTitle}>9. Garantie et service après-vente</Text>
          <Text style={styles.text}>
            Les produits vendus bénéficient de la garantie légale de conformité. Pour toute réclamation,
            l’utilisateur peut contacter le service client à l’adresse suivante : [Votre adresse e-mail].
          </Text>
        </View>

        <View style={styles.subContainer}>
          <Text style={styles.subTitle}>10. Responsabilité</Text>
          <Text style={styles.text}>
            L’entreprise ne saurait être tenue responsable des dommages directs ou indirects résultant de
            l’utilisation ou de l’impossibilité d’utiliser l’Application.
          </Text>
        </View>

        <View style={styles.subContainer}>
          <Text style={styles.subTitle}>11. Propriété intellectuelle</Text>
          <Text style={styles.text}>
            Tous les éléments présents sur l’Application sont la propriété exclusive de [Nom de votre entreprise].
            Toute reproduction, distribution ou utilisation non autorisée est strictement interdite.
          </Text>
        </View>

        <View style={styles.subContainer}>
          <Text style={styles.subTitle}>12. Données personnelles</Text>
          <Text style={styles.text}>
            Les données collectées sont traitées conformément à notre Politique de Confidentialité. L’utilisateur
            dispose de droits d’accès, de rectification et de suppression de ses données.
          </Text>
        </View>

        <View style={styles.subContainer}>
          <Text style={styles.subTitle}>13. Modification des Conditions</Text>
          <Text style={styles.text}>
            L’entreprise se réserve le droit de modifier les présentes Conditions à tout moment.
            Les utilisateurs seront notifiés en cas de changement. L'utilisation continue de l’Application vaut
            acceptation des nouvelles Conditions.
          </Text>
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.subTitle}>14. Droit applicable et juridiction compétente</Text>
          <Text style={styles.text}>
            Les présentes Conditions sont soumises au droit nigérien. En cas de litige, les tribunaux de Niamey sont seuls compétents.
          </Text>
        </View>
      </View>

      {/*  POLITIQUE DE CONFIDENTIALITÉ */}
      <View style={styles.container}>
        <Text style={styles.mainTitle}>Politique de confidentialité</Text>

        <View style={styles.subContainer}>
          <Text style={styles.subTitle}>1. Introduction</Text>
          <Text style={styles.text}>
            Cette Politique de Confidentialité explique comment nous collectons, utilisons et protégeons vos données
            personnelles lorsque vous utilisez notre Application.
          </Text>
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.subTitle}>2. Responsable du traitement</Text>
          <Text style={styles.text}>
            Nom de l’entreprise : [Nom de votre entreprise]
            Adresse : [Adresse complète]
            Contact : [Adresse e-mail] – [Numéro de téléphone]
          </Text>
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.subTitle}>3. Données collectées</Text>
          <Text style={styles.text}>Les données suivantes peuvent être collectées :</Text>
          <Text> <Text style={styles.sterick}> *</Text> Nom, prénom, adresse email, numéro de téléphone</Text>
          <Text> <Text style={styles.sterick}> *</Text> Adresse de livraison</Text>
          
          <Text> <Text style={styles.sterick}> *</Text> Informations de connexion et historique de commande</Text>
          <Text> <Text style={styles.sterick}> *</Text> Données de paiement (via prestataires tiers sécurisés)</Text>
          <Text> <Text style={styles.sterick}> *</Text> Informations techniques (adresse IP, appareil utilisé)</Text>
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.subTitle}>4. Finalité de la collecte</Text>
          <Text style={styles.text}>Les données sont utilisées pour :</Text>
          <Text> <Text style={styles.sterick}> *</Text> Créer et gérer votre compte</Text>
          <Text> <Text style={styles.sterick}> *</Text> Traiter vos commandes et assurer la livraison</Text>
          <Text> <Text style={styles.sterick}> *</Text> Répondre à vos demandes via le service client</Text>
          <Text> <Text style={styles.sterick}> *</Text> Envoyer des notifications (avec votre consentement)</Text>
          <Text> <Text style={styles.sterick}> *</Text> Prévenir la fraude et sécuriser l’Application</Text>
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.subTitle}>5. Partage des données</Text>
          <Text style={styles.text}>Vos données ne sont jamais vendues. Elles peuvent être partagées uniquement avec :</Text>
          <Text> <Text style={styles.sterick}> *</Text> Prestataires techniques (hébergement, paiement, livraison)</Text>
          <Text> <Text style={styles.sterick}> *</Text> Autorités légales si la loi l’exige</Text>
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.subTitle}>6. Sécurité des données</Text>
          <Text style={styles.text}>
          Nous mettons en place des mesures de sécurité (cryptage, pare-feu, authentification) pour protéger vos données 
          contre tout accès non autorisé.
          </Text>
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.subTitle}>7. Durée de conservation</Text>
          <Text style={styles.text}>
          Les données sont conservées aussi longtemps que nécessaire pour les finalités ci-dessus ou pour répondre à 
          des obligations légales.
          </Text>
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.subTitle}>8. Vos droits</Text>
          <Text style={styles.text}>Vous pouvez à tout moment :</Text>

          <Text> <Text style={styles.sterick}> *</Text> Accéder à vos données personnelles</Text>
          <Text> <Text style={styles.sterick}> *</Text> Demander leur rectification ou suppression</Text>
          <Text> <Text style={styles.sterick}> *</Text> Vous opposer à leur traitement</Text>
          <Text> <Text style={styles.sterick}> *</Text> Retirer votre consentement (pour le marketing)</Text>
          <Text> <Text style={styles.sterick}> *</Text> Autorités légales si la loi l’exige</Text>
          <Text> <Text style={styles.sterick}> *</Text> Autorités légales si la loi l’exige</Text>
          <Text> <Text style={styles.sterick}> *</Text> Autorités légales si la loi l’exige</Text>
          <Text> <Text style={styles.sterick}> *</Text> Autorités légales si la loi l’exige</Text>
          <Text>  Demande par email : <Text style={{color:"darkblue"}}>[Votre email]</Text></Text>

        </View>
        <View style={styles.subContainer}>
          <Text style={styles.subTitle}>9. Transfert hors Afrique</Text>
          <Text style={styles.text}>
          Nous nous engageons à ne transférer vos données en dehors de l’Afrique qu’avec les garanties 
          nécessaires et en conformité avec la loi.
          </Text>
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.subTitle}>10. Cookies</Text>
          <Text style={styles.text}>
          L’Application peut utiliser des cookies pour améliorer l’expérience utilisateur. Vous pouvez les désactiver 
          dans les paramètres de votre appareil.
          </Text>
        </View>
        <View style={[styles.subContainer, {marginBottom:20}]}>
          <Text style={styles.subTitle}>11. Modification de la Politique</Text>
          <Text style={styles.text}>
          Cette Politique peut être modifiée à tout moment. Les utilisateurs seront informés des changements via l’Application ou par e-mail.
          </Text>
        </View>

      </View>
    </ScrollView>
  )
}

export default ConditionsJuridiquesPolitiques

const styles = StyleSheet.create({
  contentContainer: {
    padding: 4
  },
  container: {
    padding: 2
  },
  subContainer: {
    marginVertical: 4
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 18,
    color: '#FF9900',
  },
  linkTitle: {
    fontSize: 18,
    color: '#FF9900',
  },
  text: {
    fontSize: 14,
  },
  sterick:{
color: '#FF9900',
  },
  buttonContainer: {
    marginVertical: 40,
  },
  button: {
    backgroundColor: '#FF9900',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: "center"
  }
})