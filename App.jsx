import React, { useState, useEffect, useCallback, useRef } from 'react'
import './App.css'

/* ═══════════════════════════════════════════════════════════════
   TRANSLATIONS  (from Excel teksten sheet — all 6 languages)
═══════════════════════════════════════════════════════════════ */
const T = {
  nl: {
    appTitle: 'Bedrijfsnatuurplan',
    appSub: 'Habitatinventarisatie',
    demoWarning: '⚠️ DEMO — Gebruik voor officiële certificering de Excel-template van On the way to PlanetProof.',
    tabCompany: 'Bedrijf',
    tabHabitat: 'Habitat & Plan',
    tabWeather: 'Klimaat',
    tabReport: 'Rapport',
    companySection: '1. Bedrijfsgegevens',
    companyName: 'Naam bedrijf',
    address: 'Adres',
    postcode: 'Postcode',
    city: 'Plaats',
    country: 'Land',
    growerName: 'Naam teler / contactpersoon',
    email: 'E-mailadres',
    regNo: 'Registratienummer',
    certNo: 'Certificaatnummer',
    cropYear: 'Betreft teeltjaar',
    totalArea: 'Totaal bedrijfsareaal [ha]',
    totalPlots: 'Totaal aantal percelen',
    save: 'Opslaan',
    exportXlsx: 'Excel exporteren',
    importXlsx: 'Excel importeren',
    reset: 'Wissen',
    habitatSection: '2. Habitatmaatregelen',
    catYard: 'Erf & gebouwen',
    catPlot: 'Percelen',
    catWater: 'Waterbeheer',
    catWoody: 'Houtige elementen',
    catOther: 'Overige elementen',
    colCode: 'Code',
    colMeasure: 'Maatregel',
    colUnit: 'Eenheid',
    col2026: '2026',
    col2027: '2027',
    col2028: '2028',
    col2029: '2029',
    col2030: '2030',
    colPlan2028: 'Plan 2028',
    colPlan2030: 'Plan 2030',
    habitatArea: 'Habitatareaal',
    habitatPct: 'Habitat %',
    bonusPoints: 'Bonuspunten PP.6_3.7',
    weatherTitle: 'Klimaatgegevens',
    weatherInfo: 'Haal actuele klimaatgegevens op voor uw locatie. Coördinaten worden lokaal opgeslagen.',
    fetchWeather: 'Klimaat ophalen',
    fetching: 'Bezig...',
    temperature: 'Temperatuur',
    precipitation: 'Neerslag',
    windspeed: 'Windsnelheid',
    weatherCode: 'Weer',
    coords: 'Coördinaten',
    noAddress: 'Vul eerst adres en plaatsnaam in.',
    locationNotFound: 'Locatie niet gevonden. Controleer het adres.',
    weatherFail: 'Kan geen weerdata ophalen.',
    recommendations: 'Aanbevelingen op basis van klimaat',
    reportTitle: '3. Rapport',
    reportCompany: 'Bedrijfsoverzicht',
    reportHabitat: 'Habitatsamenvatting 2026',
    reportMeasures: 'Gerealiseerde maatregelen 2026',
    noMeasures: 'Geen maatregelen ingevuld.',
    printReport: 'Rapport afdrukken',
    saved: 'Opgeslagen ✓',
    nativeTip: 'Aanbeveling: Inheemse soorten dragen bij aan versterking van lokale biodiversiteit.',
    selectLang: 'Taal',
    pcs: 'stuks',
    ha: 'ha',
    m: 'm',
    m2: 'm²',
    divisionSafe: 'Vul bedrijfsareaal in voor %',
  },
  en: {
    appTitle: 'Biodiversity Action Plan',
    appSub: 'Habitat Inventory',
    demoWarning: '⚠️ DEMO — For official certification use the Excel template from On the way to PlanetProof.',
    tabCompany: 'Company',
    tabHabitat: 'Habitat & Plan',
    tabWeather: 'Climate',
    tabReport: 'Report',
    companySection: '1. Company data',
    companyName: 'Company name',
    address: 'Address',
    postcode: 'Zipcode',
    city: 'City',
    country: 'Country',
    growerName: 'Grower / contact person',
    email: 'E-mail address',
    regNo: 'Registration number',
    certNo: 'Certificate number',
    cropYear: 'Cultivation year',
    totalArea: 'Total company area [ha]',
    totalPlots: 'Total number of plots',
    save: 'Save',
    exportXlsx: 'Export Excel',
    importXlsx: 'Import Excel',
    reset: 'Reset',
    habitatSection: '2. Habitat measures',
    catYard: 'Yard & buildings',
    catPlot: 'Plot measures',
    catWater: 'Water management',
    catWoody: 'Woody elements',
    catOther: 'Other elements',
    colCode: 'Code',
    colMeasure: 'Measure',
    colUnit: 'Unit',
    col2026: '2026',
    col2027: '2027',
    col2028: '2028',
    col2029: '2029',
    col2030: '2030',
    colPlan2028: 'Plan 2028',
    colPlan2030: 'Plan 2030',
    habitatArea: 'Habitat area',
    habitatPct: 'Habitat %',
    bonusPoints: 'Bonus points PP.6_3.7',
    weatherTitle: 'Climate data',
    weatherInfo: 'Fetch current climate data for your location. Coordinates are stored locally.',
    fetchWeather: 'Fetch climate',
    fetching: 'Loading...',
    temperature: 'Temperature',
    precipitation: 'Precipitation',
    windspeed: 'Wind speed',
    weatherCode: 'Weather',
    coords: 'Coordinates',
    noAddress: 'Please fill in address and city first.',
    locationNotFound: 'Location not found. Check the address.',
    weatherFail: 'Could not fetch weather data.',
    recommendations: 'Recommendations based on climate',
    reportTitle: '3. Report',
    reportCompany: 'Company overview',
    reportHabitat: 'Habitat summary 2026',
    reportMeasures: 'Realised measures 2026',
    noMeasures: 'No measures entered.',
    printReport: 'Print report',
    saved: 'Saved ✓',
    nativeTip: 'Recommendation: Native species contribute to local biodiversity.',
    selectLang: 'Language',
    pcs: 'pcs',
    ha: 'ha',
    m: 'm',
    m2: 'm²',
    divisionSafe: 'Enter company area for %',
  },
  de: {
    appTitle: 'BetriebsNaturPlan',
    appSub: 'Habitatinventur',
    demoWarning: '⚠️ DEMO — Für die offizielle Zertifizierung die Excel-Vorlage von On the way to PlanetProof verwenden.',
    tabCompany: 'Betrieb',
    tabHabitat: 'Habitat & Plan',
    tabWeather: 'Klima',
    tabReport: 'Bericht',
    companySection: '1. Unternehmensdaten',
    companyName: 'Name des Unternehmens',
    address: 'Adresse',
    postcode: 'Postleitzahl',
    city: 'Ort',
    country: 'Land',
    growerName: 'Name des Anbauers / Kontakt',
    email: 'E-Mail-Adresse',
    regNo: 'Registrierungsnummer',
    certNo: 'Zertifikatsnummer',
    cropYear: 'Anbaujahr',
    totalArea: 'Gesamtbetriebsfläche [ha]',
    totalPlots: 'Gesamtzahl der Parzellen',
    save: 'Speichern',
    exportXlsx: 'Excel exportieren',
    importXlsx: 'Excel importieren',
    reset: 'Zurücksetzen',
    habitatSection: '2. Habitatmaßnahmen',
    catYard: 'Hof & Gebäude',
    catPlot: 'Parzellen',
    catWater: 'Wassermanagement',
    catWoody: 'Gehölzelemente',
    catOther: 'Weitere Elemente',
    colCode: 'Code',
    colMeasure: 'Maßnahme',
    colUnit: 'Einheit',
    col2026: '2026',
    col2027: '2027',
    col2028: '2028',
    col2029: '2029',
    col2030: '2030',
    colPlan2028: 'Plan 2028',
    colPlan2030: 'Plan 2030',
    habitatArea: 'Habitatfläche',
    habitatPct: 'Habitat %',
    bonusPoints: 'Bonuspunkte PP.6_3.7',
    weatherTitle: 'Klimadaten',
    weatherInfo: 'Aktuelle Klimadaten für Ihren Standort abrufen. Koordinaten werden lokal gespeichert.',
    fetchWeather: 'Klima abrufen',
    fetching: 'Laden...',
    temperature: 'Temperatur',
    precipitation: 'Niederschlag',
    windspeed: 'Windgeschwindigkeit',
    weatherCode: 'Wetter',
    coords: 'Koordinaten',
    noAddress: 'Bitte zuerst Adresse und Ort ausfüllen.',
    locationNotFound: 'Standort nicht gefunden. Adresse überprüfen.',
    weatherFail: 'Wetterdaten konnten nicht abgerufen werden.',
    recommendations: 'Empfehlungen basierend auf Klima',
    reportTitle: '3. Bericht',
    reportCompany: 'Unternehmensübersicht',
    reportHabitat: 'Habitatübersicht 2026',
    reportMeasures: 'Realisierte Maßnahmen 2026',
    noMeasures: 'Keine Maßnahmen eingetragen.',
    printReport: 'Bericht drucken',
    saved: 'Gespeichert ✓',
    nativeTip: 'Empfehlung: Einheimische Arten stärken die lokale Biodiversität.',
    selectLang: 'Sprache',
    pcs: 'Stück',
    ha: 'ha',
    m: 'm',
    m2: 'm²',
    divisionSafe: 'Betriebsfläche für % eintragen',
  },
  es: {
    appTitle: 'Plan de Acción para la Biodiversidad',
    appSub: 'Inventario de Hábitats',
    demoWarning: '⚠️ DEMO — Para la certificación oficial use la plantilla de Excel de On the way to PlanetProof.',
    tabCompany: 'Empresa',
    tabHabitat: 'Hábitat & Plan',
    tabWeather: 'Clima',
    tabReport: 'Informe',
    companySection: '1. Datos de la empresa',
    companyName: 'Nombre de la empresa',
    address: 'Dirección',
    postcode: 'Código postal',
    city: 'Ciudad',
    country: 'País',
    growerName: 'Nombre del productor / contacto',
    email: 'Correo electrónico',
    regNo: 'Número de registro',
    certNo: 'Número de certificado',
    cropYear: 'Año de cultivo',
    totalArea: 'Superficie total de la empresa [ha]',
    totalPlots: 'Número total de parcelas',
    save: 'Guardar',
    exportXlsx: 'Exportar Excel',
    importXlsx: 'Importar Excel',
    reset: 'Restablecer',
    habitatSection: '2. Medidas de hábitat',
    catYard: 'Patio y edificios',
    catPlot: 'Parcelas',
    catWater: 'Gestión del agua',
    catWoody: 'Elementos leñosos',
    catOther: 'Otros elementos',
    colCode: 'Código',
    colMeasure: 'Medida',
    colUnit: 'Unidad',
    col2026: '2026',
    col2027: '2027',
    col2028: '2028',
    col2029: '2029',
    col2030: '2030',
    colPlan2028: 'Plan 2028',
    colPlan2030: 'Plan 2030',
    habitatArea: 'Área de hábitat',
    habitatPct: 'Hábitat %',
    bonusPoints: 'Puntos de bonificación PP.6_3.7',
    weatherTitle: 'Datos climáticos',
    weatherInfo: 'Obtenga datos climáticos actuales para su ubicación. Las coordenadas se almacenan localmente.',
    fetchWeather: 'Obtener clima',
    fetching: 'Cargando...',
    temperature: 'Temperatura',
    precipitation: 'Precipitación',
    windspeed: 'Velocidad del viento',
    weatherCode: 'Tiempo',
    coords: 'Coordenadas',
    noAddress: 'Rellene primero la dirección y la ciudad.',
    locationNotFound: 'Ubicación no encontrada. Compruebe la dirección.',
    weatherFail: 'No se pudieron obtener los datos meteorológicos.',
    recommendations: 'Recomendaciones basadas en el clima',
    reportTitle: '3. Informe',
    reportCompany: 'Resumen de la empresa',
    reportHabitat: 'Resumen del hábitat 2026',
    reportMeasures: 'Medidas realizadas 2026',
    noMeasures: 'No se han introducido medidas.',
    printReport: 'Imprimir informe',
    saved: 'Guardado ✓',
    nativeTip: 'Recomendación: Las especies nativas contribuyen a la biodiversidad local.',
    selectLang: 'Idioma',
    pcs: 'uds',
    ha: 'ha',
    m: 'm',
    m2: 'm²',
    divisionSafe: 'Introduzca la superficie para el %',
  },
  fr: {
    appTitle: 'Plan Nature de l\'Exploitation',
    appSub: 'Inventaire des Habitats',
    demoWarning: '⚠️ DEMO — Pour une certification officielle, utilisez le modèle Excel de On the way to PlanetProof.',
    tabCompany: 'Exploitation',
    tabHabitat: 'Habitat & Plan',
    tabWeather: 'Climat',
    tabReport: 'Rapport',
    companySection: '1. Données de l\'exploitation',
    companyName: 'Nom de l\'exploitation',
    address: 'Adresse',
    postcode: 'Code postal',
    city: 'Localité',
    country: 'Pays',
    growerName: 'Nom de l\'exploitant / contact',
    email: 'Adresse e-mail',
    regNo: 'Numéro d\'enregistrement',
    certNo: 'Numéro de certificat',
    cropYear: 'Année de culture',
    totalArea: 'Superficie totale de l\'exploitation [ha]',
    totalPlots: 'Nombre total de parcelles',
    save: 'Enregistrer',
    exportXlsx: 'Exporter Excel',
    importXlsx: 'Importer Excel',
    reset: 'Réinitialiser',
    habitatSection: '2. Mesures pour habitats',
    catYard: 'Cour & bâtiments',
    catPlot: 'Parcelles',
    catWater: 'Gestion de l\'eau',
    catWoody: 'Éléments ligneux',
    catOther: 'Autres éléments',
    colCode: 'Code',
    colMeasure: 'Mesure',
    colUnit: 'Unité',
    col2026: '2026',
    col2027: '2027',
    col2028: '2028',
    col2029: '2029',
    col2030: '2030',
    colPlan2028: 'Plan 2028',
    colPlan2030: 'Plan 2030',
    habitatArea: 'Surface d\'habitat',
    habitatPct: 'Habitat %',
    bonusPoints: 'Points bonus PP.6_3.7',
    weatherTitle: 'Données climatiques',
    weatherInfo: 'Récupérez les données climatiques actuelles pour votre emplacement. Les coordonnées sont stockées localement.',
    fetchWeather: 'Obtenir le climat',
    fetching: 'Chargement...',
    temperature: 'Température',
    precipitation: 'Précipitations',
    windspeed: 'Vitesse du vent',
    weatherCode: 'Météo',
    coords: 'Coordonnées',
    noAddress: 'Veuillez d\'abord remplir l\'adresse et la ville.',
    locationNotFound: 'Emplacement introuvable. Vérifiez l\'adresse.',
    weatherFail: 'Impossible de récupérer les données météo.',
    recommendations: 'Recommandations basées sur le climat',
    reportTitle: '3. Rapport',
    reportCompany: 'Aperçu de l\'exploitation',
    reportHabitat: 'Résumé des habitats 2026',
    reportMeasures: 'Mesures réalisées 2026',
    noMeasures: 'Aucune mesure saisie.',
    printReport: 'Imprimer le rapport',
    saved: 'Enregistré ✓',
    nativeTip: 'Recommandation : Les espèces indigènes contribuent à la biodiversité locale.',
    selectLang: 'Langue',
    pcs: 'pcs',
    ha: 'ha',
    m: 'm',
    m2: 'm²',
    divisionSafe: 'Saisir la superficie pour le %',
  },
}

/* ═══════════════════════════════════════════════════════════════
   HABITAT MEASURES — 61 codes from the Excel
   unit: 'pcs' | 'ha' | 'm' | 'm2'
   defaultWidth: metres used for linear→ha conversion
   cat: 'yard' | 'plot' | 'water' | 'woody' | 'other'
═══════════════════════════════════════════════════════════════ */
const MEASURES = [
  /* ── Yard & buildings ──────────────────────────────────── */
  { code:'PP.5_3.15A', cat:'yard', unit:'pcs', maxPts:2,
    name:{nl:'Nesten/kasten voor vogels',en:'Nesting sites for birds',de:'Nistplätze für Vögel',es:'Nidos/cajas para aves',fr:'Nids/nichoirs pour oiseaux'} },
  { code:'PP.5_3.15B', cat:'yard', unit:'pcs', maxPts:1,
    name:{nl:'Nestpaal/zitpaal roofvogels of ooievaar',en:'Nest pole / perch for birds of prey or stork',de:'Nistpfahl/Sitzpfahl Greifvogel oder Storch',es:'Poste nido/percha para rapaces o cigüeña',fr:'Poteau nid/perchoir pour rapaces ou cigogne'} },
  { code:'PP.5_3.15C', cat:'yard', unit:'pcs', maxPts:1,
    name:{nl:'Nestgelegenheid voor (graaf)wespen',en:'Nesting for (digger) wasps',de:'Nistgelegenheit für (Grab-)Wespen',es:'Nidos para (avispa excavadora)',fr:'Nidification pour guêpes (fouisseuses)'} },
  { code:'PP.5_3.15D', cat:'yard', unit:'pcs', maxPts:1,
    name:{nl:'Insectenhotel(s)',en:'Insect hotel(s)',de:'Insektenhotel(s)',es:'Hotel(es) de insectos',fr:'Hôtel(s) à insectes'} },
  { code:'PP.5_3.15E1', cat:'yard', unit:'pcs', maxPts:1,
    name:{nl:'Kast vleermuis',en:'Bat box',de:'Fledermauskasten',es:'Caja para murciélagos',fr:'Boîte à chauves-souris'} },
  { code:'PP.5_3.15E2', cat:'yard', unit:'pcs', maxPts:1,
    name:{nl:'Kast gierzwaluw',en:'Swift box',de:'Mauerseglerkasten',es:'Caja para vencejos',fr:'Boîte à martinet'} },
  { code:'PP.5_3.15F', cat:'yard', unit:'pcs', maxPts:1,
    name:{nl:'Schuilplaats: takkenhopen (≥1 m hoog)',en:'Shelter: branch piles (≥1 m high)',de:'Unterstand: Asthaufen (≥1 m hoch)',es:'Refugio: pilas de ramas (≥1 m de altura)',fr:'Abri: tas de branches (≥1 m de haut)'} },
  { code:'PP.5_3.15G', cat:'yard', unit:'pcs', maxPts:1,
    name:{nl:'Schuilplaats: steenhopen (≥1 m hoog)',en:'Shelter: stone heaps (≥1 m high)',de:'Unterstand: Steinhaufen (≥1 m hoch)',es:'Refugio: montones de piedras (≥1 m)',fr:'Abri: tas de pierres (≥1 m de haut)'} },
  { code:'PP.6_3.aa', cat:'yard', unit:'m2',
    name:{nl:'Siertuin bij woning/gebouwen',en:'Ornamental garden at buildings',de:'Ziergarten bei Haus/Gebäuden',es:'Jardín ornamental en casa/edificios',fr:'Jardin d\'ornement près des bâtiments'} },
  { code:'PP.6_3.ab', cat:'yard', unit:'m2',
    name:{nl:'Begroeide gevel',en:'Vegetated façade',de:'Begrünte Fassade',es:'Fachada vegetal',fr:'Façade végétalisée'} },
  { code:'PP.6_3.ac', cat:'yard', unit:'m2',
    name:{nl:'Groen (begroeid) dak',en:'Green (vegetated) roof',de:'Begrüntes Dach',es:'Tejado verde (con vegetación)',fr:'Toiture verte (végétalisée)'} },

  /* ── Plot measures ─────────────────────────────────────── */
  { code:'PP.5_3.08', cat:'plot', unit:'ha', defaultWidth:3,
    name:{nl:'Niet-gemaaide gras-/graanrand langs perceel',en:'Unmown grass / grain border along plot',de:'Ungemähter Gras-/Getreiderand entlang Parzelle',es:'Borde de hierba/cereal sin segar junto a parcela',fr:'Bordure herbe/céréale non fauchée le long de la parcelle'} },
  { code:'PP.5_3.09', cat:'plot', unit:'ha', defaultWidth:3,
    name:{nl:'Éénjarige kruiden-/bloemenrand langs perceel',en:'Annual herb / flower border along plot',de:'Einjähriger Kräuter-/Blührand entlang Parzelle',es:'Borde anual de hierbas/flores junto a parcela',fr:'Bordure annuelle d\'herbes/fleurs le long de la parcelle'} },
  { code:'PP.5_3.09E', cat:'plot', unit:'ha', defaultWidth:0.3,
    name:{nl:'Bloeiende kruiden-/bloemenrand IN perceel (≥30 cm)',en:'Flowering herb/flower border within plot (≥30 cm)',de:'Blühender Kräuter-/Blührand IN Parzelle (≥30 cm)',es:'Borde de hierbas/flores dentro de parcela (≥30 cm)',fr:'Bordure fleurie dans la parcelle (≥30 cm)'} },
  { code:'PP.5_3.09F', cat:'plot', unit:'ha', defaultWidth:3,
    name:{nl:'Meerjarige bloemen-/kruidenrand',en:'Perennial flower / herb border',de:'Mehrjähriger Blüten-/Kräuterrand',es:'Borde perenne de flores/hierbas',fr:'Bordure pérenne de fleurs/herbes'} },
  { code:'PP.5_3.10', cat:'plot', unit:'ha',
    name:{nl:'Overhoek met gevarieerde kruidenvegetatie',en:'Corner with varied herbaceous vegetation',de:'Ecke mit abwechslungsreicher Krautvegetation',es:'Rincón con vegetación herbácea variada',fr:'Coin de parcelle avec végétation herbacée variée'} },
  { code:'PP.5_3.11', cat:'plot', unit:'ha',
    name:{nl:'Groene braak (>6 mnd. niet beteeld)',en:'Green fallow (>6 months uncultivated)',de:'Grüne Brache (>6 Monate nicht bewirtschaftet)',es:'Barbecho verde (>6 meses sin cultivar)',fr:'Jachère verte (>6 mois non cultivée)'} },
  { code:'PP.5_3.16', cat:'plot', unit:'ha',
    name:{nl:'Ongeploegd, stoppel/gewasresten over winter',en:'Unploughed – stubble / crop remains over winter',de:'Ungepflügt – Stoppeln/Erntereste über Winter',es:'Sin arar – rastrojo/restos del cultivo en invierno',fr:'Non labouré – chaume/résidus de culture en hiver'} },
  { code:'PP.6_3.za', cat:'plot', unit:'ha',
    name:{nl:'Kruidenrijk grasland',en:'Herb-rich grassland',de:'Kräuterreiches Grünland',es:'Pradera rica en hierbas',fr:'Prairie herbeuse'} },
  { code:'PP.6_3.ca', cat:'plot', unit:'ha',
    name:{nl:'Kopakker met kruiden-/bloembegroeiing',en:'Headland with herb / flowering vegetation',de:'Vorgewende mit Kräuter-/Blütenvegetation',es:'Cabecera con vegetación herbácea y floral',fr:'Pointe de parcelle avec végétation herbacée et fleurie'} },
  { code:'PP.6_3.cb', cat:'plot', unit:'ha',
    name:{nl:'Biodivers AkkerMozaïek (BAM)',en:'Biodiverse field mosaic (BAM)',de:'Biodiverses Feldmosaik (BAM)',es:'Mosaico de campos biodiverso (BAM)',fr:'Mosaïque de champs biodiversifiée (BAM)'} },

  /* ── Water management ──────────────────────────────────── */
  { code:'PP.5_3.18A', cat:'water', unit:'m', defaultWidth:2,
    name:{nl:'Slootkant gefaseerd maaien (max. helft per jaar)',en:'Phased mowing of ditch bank (max. half per year)',de:'Phasenweises Mähen des Grabenufers (max. Hälfte/Jahr)',es:'Siega progresiva de la orilla de la acequia (máx. mitad/año)',fr:'Fauchage échelonné de la berge (max. moitié/an)'} },
  { code:'PP.5_3.18B', cat:'water', unit:'m', defaultWidth:2,
    name:{nl:'Sloot uitbaggeren – bagger niet op kant afzetten',en:'Ditch dredging – dredged material not on bank',de:'Graben ausbaggern – Baggergut nicht auf Ufer',es:'Dragado de acequia – material no sobre la orilla',fr:'Dragage du fossé – matériaux non déposés sur la berge'} },
  { code:'PP.5_3.18C', cat:'water', unit:'m', defaultWidth:2,
    name:{nl:'Natuurvriendelijke apparatuur (maaikorf, e.d.)',en:'Eco-friendly equipment (mowing basket, etc.)',de:'Naturschonendes Gerät (Mähkorb u. ä.)',es:'Equipo ecológico (cesta de siega, etc.)',fr:'Équipement respectueux de la nature (panier de fauche, etc.)'} },
  { code:'PP.5_3.18D', cat:'water', unit:'m', defaultWidth:2,
    name:{nl:'Maaisel van slootkant afvoeren',en:'Remove grass clippings from ditch bank',de:'Grünschnitt vom Grabenufer entfernen',es:'Retirar los recortes de la orilla de la acequia',fr:'Enlever les déchets de fauche de la berge du fossé'} },
  { code:'PP.5_3.19', cat:'water', unit:'m', defaultWidth:2,
    name:{nl:'Natuurvriendelijke oever (talud 1:2, ≥1 m onder water)',en:'Eco-friendly bank (slope 1:2, ≥1 m below water)',de:'Naturfreundliches Ufer (Böschung 1:2, ≥1 m unter Wasser)',es:'Orilla ecológica (talud 1:2, ≥1 m bajo el agua)',fr:'Berge écologique (talus 1:2, ≥1 m sous l\'eau)'} },
  { code:'PP.5_3.20A', cat:'water', unit:'m2',
    name:{nl:'Rietkragen of rietland',en:'Reed borders or reed bed',de:'Schilfränder oder Schilfbett',es:'Bordes de cañas o cañaveral',fr:'Colliers de roseaux ou terrain de roseaux'} },
  { code:'PP.5_3.20B', cat:'water', unit:'m2',
    name:{nl:'Poel',en:'Pond',de:'Teich',es:'Estanque',fr:'Étang'} },
  { code:'PP.5_3.21A', cat:'water', unit:'m', defaultWidth:2,
    name:{nl:'Begroeide randen van waterreservoirs',en:'Vegetated edges of water reservoirs',de:'Begrünte Ränder von Wasserspeichern',es:'Bordes con vegetación de embalses',fr:'Bords végétalisés des réservoirs d\'eau'} },
  { code:'PP.5_3.21B', cat:'water', unit:'m2',
    name:{nl:'Waterreservoir met stabiele onderwatervegetatie',en:'Water reservoir with stable underwater vegetation',de:'Wasserspeicher mit stabiler Unterwasservegetation',es:'Embalse con vegetación subacuática estable',fr:'Réservoir avec végétation sous-marine stable'} },
  { code:'PP.6_3.wa', cat:'water', unit:'m2',
    name:{nl:'Klein wetland / griend / plasdras',en:'Small wetland / coppice / wet area',de:'Kleines Feuchtgebiet / Weidengehölz / Nassbereich',es:'Pequeño humedal / soto / zona encharcada',fr:'Petite zone humide / saulaie / zone marécageuse'} },

  /* ── Woody elements ────────────────────────────────────── */
  { code:'PP.6_3.ba', cat:'woody', unit:'pcs',
    name:{nl:'Solitaire boom – kroondiameter 1–3 m',en:'Solitary tree – crown Ø 1–3 m',de:'Solitärbaum – Kronendurchmesser 1–3 m',es:'Árbol solitario – diámetro de copa 1-3 m',fr:'Arbre solitaire – diamètre de couronne 1–3 m'} },
  { code:'PP.6_3.bb', cat:'woody', unit:'pcs',
    name:{nl:'Solitaire boom – kroondiameter >3 m',en:'Solitary tree – crown Ø >3 m',de:'Solitärbaum – Kronendurchmesser >3 m',es:'Árbol solitario – diámetro de copa >3 m',fr:'Arbre solitaire – diamètre de couronne >3 m'} },
  { code:'PP.5_3.22', cat:'woody', unit:'m', defaultWidth:1.5,
    name:{nl:'Houtige vegetatiestrook (≥1,5 m breed, ≥2 m hoog)',en:'Woody vegetation strip (≥1.5 m wide, ≥2 m high)',de:'Holziger Vegetationsstreifen (≥1,5 m breit, ≥2 m hoch)',es:'Franja de vegetación leñosa (≥1,5 m ancho, ≥2 m alto)',fr:'Bande de végétation ligneuse (≥1,5 m large, ≥2 m haut)'} },
  { code:'PP.5_3.23', cat:'woody', unit:'m', defaultWidth:1.0,
    name:{nl:'Hagen/heggen met gras-/kruidenrand (≥0,5 m)',en:'Hedgerows / hedges with grass or herb edge (≥0.5 m)',de:'Hecken mit Gras-/Kräuterrand (≥0,5 m)',es:'Setos/cercas con borde de hierba/gramíneas (≥0,5 m)',fr:'Haies avec bande enherbée/fleurie (≥0,5 m)'} },
  { code:'PP.5_3.24', cat:'woody', unit:'ha',
    name:{nl:'Bosje(s)',en:'Copse / small wood',de:'Gehölz(e)',es:'Bosquete(s)',fr:'Bosquet(s)'} },
  { code:'PP.6_3.bc', cat:'woody', unit:'ha',
    name:{nl:'Half- of hoogstamboomgaard',en:'Half-standard or standard orchard',de:'Halbstamm- oder Hochstammobstgarten',es:'Huerto de medio tallo o tallo estándar',fr:'Verger à demi-tige ou à haute tige'} },

  /* ── Other elements ────────────────────────────────────── */
  { code:'PP.6_3.da', cat:'other', unit:'m', defaultWidth:1,
    name:{nl:'Oude stenen muurtjes, ruïnes, lineaire elementen',en:'Old stone walls, ruins, linear landscape elements',de:'Alte Steinmauern, Ruinen, lineare Landschaftselemente',es:'Muros de piedra viejos, ruinas, elementos lineales del paisaje',fr:'Vieux murs en pierre, ruines, éléments linéaires du paysage'} },
  { code:'PP.6_3.db', cat:'other', unit:'m', defaultWidth:1,
    name:{nl:'Tuunwallen, zandwallen',en:'Turf walls, sand mounds',de:'Rasenmauern, Sandhügel',es:'Muros de tepes, montículos de arena',fr:'Murs de gazon, buttes de sable'} },
  { code:'PP.6_3.dc', cat:'other', unit:'m', defaultWidth:2,
    name:{nl:'Paden, schouwpaden, onverharde wegen, holle weg',en:'Paths, towpaths, dirt roads, sunken lanes',de:'Wege, Inspektionspfade, Feldwege, Hohlwege',es:'Senderos, caminos de sirga, caminos de tierra, caminos hundidos',fr:'Sentiers, chemins de halage, chemins de terre, chemins creux'} },
  { code:'PP.6_3.dd', cat:'other', unit:'ha',
    name:{nl:'Ongebruikt talud, ruigte, ruderaalterrein',en:'Unused slope, rough terrain, ruderal area',de:'Ungenutzter Hang, Brachland, Ruderalfläche',es:'Talud no utilizado, terreno áspero, área ruderal',fr:'Pente inutilisée, terrain accidenté, zone rudérale'} },
]

/* ═══════════════════════════════════════════════════════════════
   WEATHER CODE → description mapping (WMO)
═══════════════════════════════════════════════════════════════ */
const WMO_DESC = {
  0:'Clear sky', 1:'Mainly clear', 2:'Partly cloudy', 3:'Overcast',
  45:'Fog', 48:'Icing fog',
  51:'Light drizzle', 53:'Moderate drizzle', 55:'Dense drizzle',
  61:'Slight rain', 63:'Moderate rain', 65:'Heavy rain',
  71:'Slight snow', 73:'Moderate snow', 75:'Heavy snow',
  80:'Slight showers', 81:'Moderate showers', 82:'Violent showers',
  95:'Thunderstorm', 96:'Thunderstorm + hail', 99:'Thunderstorm + heavy hail',
}

/* ═══════════════════════════════════════════════════════════════
   CALC HELPERS
═══════════════════════════════════════════════════════════════ */
function toHa(value, unit, defaultWidth) {
  if (!value || isNaN(value)) return 0
  const v = parseFloat(value)
  if (unit === 'ha') return v
  if (unit === 'm2') return v / 10000
  if (unit === 'm') return (v * (defaultWidth || 2)) / 10000
  return 0  // 'pcs' don't count toward area
}

function calcHabitatArea(measures, yearKey) {
  return MEASURES.reduce((sum, m) => {
    const val = measures[m.code]?.[yearKey] || 0
    return sum + toHa(val, m.unit, m.defaultWidth)
  }, 0)
}

function calcBonusPoints(measures, yearKey) {
  return MEASURES.filter(m => (measures[m.code]?.[yearKey] || 0) > 0).length
}

/* ═══════════════════════════════════════════════════════════════
   DEFAULT STATE
═══════════════════════════════════════════════════════════════ */
function defaultCompany() {
  return {
    name:'', address:'', postcode:'', city:'', country:'Nederland',
    growerName:'', email:'', regNo:'', certNo:'',
    cropYear: 2026,
    totalArea: '', totalPlots: '',
    coords: null,
  }
}

function defaultMeasures() {
  const m = {}
  MEASURES.forEach(({ code }) => {
    m[code] = { y2026:0, y2027:0, y2028:0, y2029:0, y2030:0, plan2028:0, plan2030:0 }
  })
  return m
}

const YEAR_KEYS = [
  { key:'y2026', label:'col2026' },
  { key:'y2027', label:'col2027' },
  { key:'y2028', label:'col2028' },
  { key:'y2029', label:'col2029' },
  { key:'y2030', label:'col2030' },
  { key:'plan2028', label:'colPlan2028', plan:true },
  { key:'plan2030', label:'colPlan2030', plan:true },
]

const CATS = ['yard','plot','water','woody','other']
const CAT_ICONS = { yard:'🏠', plot:'🌾', water:'💧', woody:'🌲', other:'🗺' }
const CAT_KEY = { yard:'catYard', plot:'catPlot', water:'catWater', woody:'catWoody', other:'catOther' }

/* ═══════════════════════════════════════════════════════════════
   APP
═══════════════════════════════════════════════════════════════ */
export default function App() {
  const [lang, setLang]       = useState(() => localStorage.getItem('bap_lang') || 'nl')
  const [tab, setTab]         = useState('company')
  const [company, setCompany] = useState(() => {
    try { return JSON.parse(localStorage.getItem('bap_company')) || defaultCompany() } catch { return defaultCompany() }
  })
  const [measures, setMeasures] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('bap_measures'))
      return saved ? { ...defaultMeasures(), ...saved } : defaultMeasures()
    } catch { return defaultMeasures() }
  })
  const [weather, setWeather]   = useState(null)
  const [weatherLoading, setWeatherLoading] = useState(false)
  const [weatherError, setWeatherError]     = useState('')
  const [savedMsg, setSavedMsg]             = useState('')
  const [openCats, setOpenCats]             = useState({ yard:true, plot:true, water:false, woody:false, other:false })
  const fileRef = useRef()

  const t = T[lang]

  // Persist lang
  useEffect(() => { localStorage.setItem('bap_lang', lang) }, [lang])

  /* ── Save ──────────────────────────────────────────────── */
  const save = useCallback(() => {
    localStorage.setItem('bap_company', JSON.stringify(company))
    localStorage.setItem('bap_measures', JSON.stringify(measures))
    setSavedMsg(t.saved)
    setTimeout(() => setSavedMsg(''), 2000)
  }, [company, measures, t.saved])

  /* ── Excel export (SheetJS) ────────────────────────────── */
  const exportXlsx = async () => {
    // Dynamically load SheetJS from CDN
    if (!window.XLSX) {
      await new Promise((resolve, reject) => {
        const s = document.createElement('script')
        s.src = 'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js'
        s.onload = resolve; s.onerror = reject
        document.head.appendChild(s)
      })
    }
    const XLSX = window.XLSX
    const wb = XLSX.utils.book_new()

    // Sheet 1: Bedrijf (Company)
    const companyRows = [
      ['Veld', 'Waarde'],
      [t.companyName,    company.name],
      [t.address,        company.address],
      [t.postcode,       company.postcode],
      [t.city,           company.city],
      [t.country,        company.country],
      [t.growerName,     company.growerName],
      [t.email,          company.email],
      [t.regNo,          company.regNo],
      [t.certNo,         company.certNo],
      [t.cropYear,       company.cropYear],
      [t.totalArea,      company.totalArea],
      [t.totalPlots,     company.totalPlots],
    ]
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(companyRows), 'Bedrijf')

    // Sheet 2: Habitat & Plan
    const habitatHeader = [
      t.colCode, t.colMeasure, t.colUnit,
      t.col2026, t.col2027, t.col2028, t.col2029, t.col2030,
      t.colPlan2028, t.colPlan2030,
      t.habitatArea + ' 2026 (ha)',
    ]
    const habitatRows = [habitatHeader]
    MEASURES.forEach(m => {
      const v = measures[m.code] || {}
      const areaHa = toHa(v.y2026 || 0, m.unit, m.defaultWidth)
      habitatRows.push([
        m.code,
        m.name[lang] || m.name.en,
        t[m.unit] || m.unit,
        v.y2026 || 0, v.y2027 || 0, v.y2028 || 0, v.y2029 || 0, v.y2030 || 0,
        v.plan2028 || 0, v.plan2030 || 0,
        areaHa,
      ])
    })
    // Summary rows
    const area2026export = calcHabitatArea(measures, 'y2026')
    const totalAreaNum = parseFloat(company.totalArea) || 0
    const pctExport = totalAreaNum > 0 ? (area2026export / totalAreaNum * 100).toFixed(1) : 'N/A'
    habitatRows.push([])
    habitatRows.push([t.habitatArea + ' 2026 (ha)', '', '', '', '', '', '', '', '', '', area2026export.toFixed(3)])
    habitatRows.push([t.habitatPct,                 '', '', '', '', '', '', '', '', '', pctExport === 'N/A' ? pctExport : pctExport + '%'])
    habitatRows.push([t.bonusPoints,                '', '', '', '', '', '', '', '', '', calcBonusPoints(measures, 'y2026')])
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(habitatRows), 'Habitat & Plan')

    // Sheet 3: Rapport (summary by year)
    const reportRows = [
      ['', ...YEAR_KEYS.map(({ key }) => key.replace('y','').replace('plan','Plan '))],
      [t.habitatArea + ' (ha)', ...YEAR_KEYS.map(({ key }) => calcHabitatArea(measures, key).toFixed(3))],
      [t.bonusPoints,           ...YEAR_KEYS.map(({ key }) => calcBonusPoints(measures, key))],
    ]
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(reportRows), 'Rapport')

    const filename = `BAP-habitat-${(company.name || 'export').replace(/[^a-zA-Z0-9]/g,'-')}.xlsx`
    XLSX.writeFile(wb, filename)
  }

  /* ── Excel import (SheetJS) ────────────────────────────── */
  const importXlsx = async e => {
    const file = e.target.files[0]; if (!file) return
    if (!window.XLSX) {
      await new Promise((resolve, reject) => {
        const s = document.createElement('script')
        s.src = 'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js'
        s.onload = resolve; s.onerror = reject
        document.head.appendChild(s)
      })
    }
    const XLSX = window.XLSX
    const reader = new FileReader()
    reader.onload = ev => {
      try {
        const wb = XLSX.read(ev.target.result, { type: 'array' })

        // Read Bedrijf sheet
        const bedrijfSheet = wb.Sheets['Bedrijf']
        if (bedrijfSheet) {
          const rows = XLSX.utils.sheet_to_json(bedrijfSheet, { header: 1 })
          const fieldMap = {
            [t.companyName]: 'name',   [t.address]: 'address',
            [t.postcode]:    'postcode',[t.city]:    'city',
            [t.country]:     'country', [t.growerName]: 'growerName',
            [t.email]:       'email',   [t.regNo]:   'regNo',
            [t.certNo]:      'certNo',  [t.cropYear]:'cropYear',
            [t.totalArea]:   'totalArea',[t.totalPlots]:'totalPlots',
          }
          // Also try Dutch keys as fallback
          const dutchMap = {
            'Naam bedrijf':'name','Adres':'address','Postcode':'postcode',
            'Plaats':'city','Land':'country','Naam teler / contactpersoon':'growerName',
            'E-mailadres':'email','Registratienummer':'regNo','Certificaatnummer':'certNo',
            'Betreft teeltjaar':'cropYear','Totaal bedrijfsareaal [ha]':'totalArea',
            'Totaal aantal percelen':'totalPlots',
          }
          const newCompany = { ...defaultCompany() }
          rows.slice(1).forEach(row => {
            const label = row[0]; const value = row[1]
            const field = fieldMap[label] || dutchMap[label]
            if (field && value !== undefined) newCompany[field] = value
          })
          setCompany(newCompany)
        }

        // Read Habitat & Plan sheet
        const habSheet = wb.Sheets['Habitat & Plan']
        if (habSheet) {
          const rows = XLSX.utils.sheet_to_json(habSheet, { header: 1 })
          // header row: Code, Measure, Unit, 2026, 2027, 2028, 2029, 2030, Plan 2028, Plan 2030
          const newMeasures = defaultMeasures()
          rows.slice(1).forEach(row => {
            const code = row[0]
            if (!code || !newMeasures[code]) return
            newMeasures[code] = {
              y2026:    parseFloat(row[3]) || 0,
              y2027:    parseFloat(row[4]) || 0,
              y2028:    parseFloat(row[5]) || 0,
              y2029:    parseFloat(row[6]) || 0,
              y2030:    parseFloat(row[7]) || 0,
              plan2028: parseFloat(row[8]) || 0,
              plan2030: parseFloat(row[9]) || 0,
            }
          })
          setMeasures(newMeasures)
        }
      } catch (err) {
        alert('Kon Excel-bestand niet lezen. Controleer of het een geldig .xlsx-bestand is.')
        console.error(err)
      }
    }
    reader.readAsArrayBuffer(file)
    e.target.value = ''
  }

  /* ── Reset ─────────────────────────────────────────────── */
  const reset = () => {
    if (!confirm('Reset all data?')) return
    setCompany(defaultCompany())
    setMeasures(defaultMeasures())
    localStorage.removeItem('bap_company')
    localStorage.removeItem('bap_measures')
  }

  /* ── Weather ───────────────────────────────────────────── */
  const fetchWeather = async () => {
    if (!company.city && !company.address) { setWeatherError(t.noAddress); return }
    setWeatherLoading(true); setWeatherError('')
    try {
      const q = encodeURIComponent(`${company.address||''} ${company.city||''} ${company.country||''}`.trim())
      const geo = await fetch(`https://nominatim.openstreetmap.org/search?q=${q}&format=json&limit=1`, {
        headers: { 'Accept-Language': lang }
      }).then(r => r.json())
      if (!geo.length) { setWeatherError(t.locationNotFound); setWeatherLoading(false); return }
      const { lat, lon } = geo[0]
      setCompany(c => ({ ...c, coords: { lat: parseFloat(lat), lon: parseFloat(lon) } }))
      const w = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
        `&current=temperature_2m,precipitation,windspeed_10m,weather_code` +
        `&timezone=auto`
      ).then(r => r.json())
      setWeather(w.current)
    } catch { setWeatherError(t.weatherFail) }
    setWeatherLoading(false)
  }

  /* ── Habitat calcs ─────────────────────────────────────── */
  const area2026  = calcHabitatArea(measures, 'y2026')
  const totalArea = parseFloat(company.totalArea) || 0
  const pct       = totalArea > 0 ? (area2026 / totalArea * 100).toFixed(1) : null
  const bonus     = calcBonusPoints(measures, 'y2026')

  /* ── Measure update ────────────────────────────────────── */
  const setVal = (code, yearKey, raw) => {
    const v = raw === '' ? 0 : parseFloat(raw) || 0
    setMeasures(prev => ({ ...prev, [code]: { ...prev[code], [yearKey]: v } }))
  }

  /* ─────────────────────────────────────────────────────── */
  return (
    <div className="app">
      {/* ── Header ──────────────────────────────────────── */}
      <header className="header">
        <div className="header-inner">
          <div className="brand">
            <span className="brand-icon">🌿</span>
            <div>
              <div className="brand-title">{t.appTitle}</div>
              <div className="brand-sub">{t.appSub}</div>
            </div>
          </div>
          <div className="header-right">
            {savedMsg && <span className="save-toast">{savedMsg}</span>}
            <select className="lang-select" value={lang} onChange={e => setLang(e.target.value)} aria-label={t.selectLang}>
              <option value="nl">🇳🇱 Nederlands</option>
              <option value="en">🇬🇧 English</option>
              <option value="de">🇩🇪 Deutsch</option>
              <option value="es">🇪🇸 Español</option>
              <option value="fr">🇫🇷 Français</option>
            </select>
          </div>
        </div>

        {/* demo banner */}
        <div className="demo-banner">{t.demoWarning}</div>

        {/* nav tabs */}
        <nav className="tab-nav">
          {[
            { id:'company', label: t.tabCompany },
            { id:'habitat', label: t.tabHabitat },
            { id:'weather', label: t.tabWeather },
            { id:'report',  label: t.tabReport  },
          ].map(({ id, label }) => (
            <button key={id} className={`tab-btn${tab===id?' active':''}`} onClick={() => setTab(id)}>
              {label}
            </button>
          ))}
        </nav>
      </header>

      <main className="main">
        {/* ══════════════════════════════════════════════════
            COMPANY TAB
        ══════════════════════════════════════════════════ */}
        {tab === 'company' && (
          <section className="card">
            <h2>{t.companySection}</h2>

            <div className="form-grid">
              {[
                ['name',       t.companyName, 'text'],
                ['address',    t.address,     'text'],
                ['postcode',   t.postcode,    'text'],
                ['city',       t.city,        'text'],
                ['country',    t.country,     'text'],
                ['growerName', t.growerName,  'text'],
                ['email',      t.email,       'email'],
                ['regNo',      t.regNo,       'text'],
                ['certNo',     t.certNo,      'text'],
                ['cropYear',   t.cropYear,    'number'],
                ['totalArea',  t.totalArea,   'number'],
                ['totalPlots', t.totalPlots,  'number'],
              ].map(([field, label, type]) => (
                <label key={field} className="form-field">
                  <span className="field-label">{label}</span>
                  <input
                    type={type}
                    className="field-input"
                    value={company[field] ?? ''}
                    min={type==='number' ? 0 : undefined}
                    step={field==='totalArea' ? '0.01' : undefined}
                    onChange={e => setCompany(c => ({ ...c, [field]: e.target.value }))}
                  />
                </label>
              ))}
            </div>

            <div className="action-row">
              <button className="btn btn-primary" onClick={save}>{t.save}</button>
              <button className="btn btn-secondary" onClick={exportXlsx}>{t.exportXlsx}</button>
              <button className="btn btn-secondary" onClick={() => fileRef.current.click()}>{t.importXlsx}</button>
              <button className="btn btn-ghost" onClick={reset}>{t.reset}</button>
              <input ref={fileRef} type="file" accept=".xlsx" style={{display:'none'}} onChange={importXlsx}/>
            </div>
          </section>
        )}

        {/* ══════════════════════════════════════════════════
            HABITAT TAB
        ══════════════════════════════════════════════════ */}
        {tab === 'habitat' && (
          <section>
            {/* Summary bar */}
            <div className="summary-bar">
              <div className="summary-chip">
                <span className="chip-label">{t.habitatArea} 2026</span>
                <span className="chip-value">{area2026.toFixed(3)} ha</span>
              </div>
              <div className="summary-chip">
                <span className="chip-label">{t.habitatPct}</span>
                <span className="chip-value">
                  {pct !== null ? `${pct} %` : <span className="chip-muted">{t.divisionSafe}</span>}
                </span>
              </div>
              <div className="summary-chip">
                <span className="chip-label">{t.bonusPoints}</span>
                <span className="chip-value">{bonus}</span>
              </div>
              <button className="btn btn-primary btn-sm" onClick={save}>{t.save}</button>
            </div>

            {/* Native tip */}
            <div className="native-tip">🌻 {t.nativeTip}</div>

            <h2 style={{marginBottom:'1rem'}}>{t.habitatSection}</h2>

            {CATS.map(cat => {
              const catMeasures = MEASURES.filter(m => m.cat === cat)
              const open = openCats[cat]
              return (
                <div key={cat} className="cat-block">
                  <button
                    className="cat-header"
                    onClick={() => setOpenCats(prev => ({...prev, [cat]: !prev[cat]}))}
                  >
                    <span>{CAT_ICONS[cat]} {t[CAT_KEY[cat]]}</span>
                    <span className="cat-chevron">{open ? '▲' : '▼'}</span>
                  </button>

                  {open && (
                    <div className="table-wrap">
                      <table className="hab-table">
                        <thead>
                          <tr>
                            <th className="col-code">{t.colCode}</th>
                            <th className="col-name">{t.colMeasure}</th>
                            <th className="col-unit">{t.colUnit}</th>
                            {YEAR_KEYS.map(({ key, label, plan }) => (
                              <th key={key} className={`col-year${plan?' col-plan':''}`}>{t[label]}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {catMeasures.map(m => {
                            const anyFilled = YEAR_KEYS.some(({ key }) => (measures[m.code]?.[key] || 0) > 0)
                            return (
                              <tr key={m.code} className={anyFilled ? 'row-filled' : ''}>
                                <td className="col-code">
                                  <code className="code-badge">{m.code}</code>
                                </td>
                                <td className="col-name">{m.name[lang] || m.name.en}</td>
                                <td className="col-unit">
                                  <span className="unit-badge">{t[m.unit] || m.unit}</span>
                                </td>
                                {YEAR_KEYS.map(({ key, plan }) => (
                                  <td key={key} className={`col-year${plan?' col-plan':''}`}>
                                    <input
                                      type="number"
                                      className="year-input"
                                      min={0}
                                      step={m.unit==='pcs' ? 1 : 0.001}
                                      value={measures[m.code]?.[key] || ''}
                                      placeholder="0"
                                      onChange={e => setVal(m.code, key, e.target.value)}
                                    />
                                  </td>
                                ))}
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )
            })}
          </section>
        )}

        {/* ══════════════════════════════════════════════════
            WEATHER TAB
        ══════════════════════════════════════════════════ */}
        {tab === 'weather' && (
          <section className="card">
            <h2>{t.weatherTitle}</h2>
            <p className="weather-info">{t.weatherInfo}</p>

            <button
              className="btn btn-primary"
              disabled={weatherLoading}
              onClick={fetchWeather}
            >
              {weatherLoading ? t.fetching : `☁️ ${t.fetchWeather}`}
            </button>

            {weatherError && <div className="alert alert-error">{weatherError}</div>}

            {weather && (
              <div className="weather-card">
                <div className="weather-big">
                  <span className="weather-temp">{Math.round(weather.temperature_2m)}°C</span>
                  <span className="weather-desc">{WMO_DESC[weather.weather_code] || '—'}</span>
                </div>
                <div className="weather-details">
                  <div className="weather-stat">
                    <span className="stat-label">{t.precipitation}</span>
                    <span className="stat-val">{weather.precipitation ?? 0} mm</span>
                  </div>
                  <div className="weather-stat">
                    <span className="stat-label">{t.windspeed}</span>
                    <span className="stat-val">{weather.windspeed_10m ?? '—'} km/h</span>
                  </div>
                  {company.coords && (
                    <div className="weather-stat">
                      <span className="stat-label">{t.coords}</span>
                      <span className="stat-val">
                        {company.coords.lat.toFixed(4)}°, {company.coords.lon.toFixed(4)}°
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Climate-based recommendations */}
            {weather && (
              <div className="reco-block">
                <h3>💡 {t.recommendations}</h3>
                <ul className="reco-list">
                  {weather.precipitation > 0.2 && <li>🌧️ Droge dag — ideaal voor slootkant onderhoud</li>}
                  {weather.temperature_2m > 5 && weather.temperature_2m < 20 && <li>🌱 Temperatuur geschikt voor zaai van bloemstroken</li>}
                  {weather.temperature_2m >= 20 && <li>☀️ Warm weer — check waterpeilen en droge sloten</li>}
                  {weather.windspeed_10m > 30 && <li>💨 Hoge windsnelheid — stel maaiwerk uit</li>}
                  <li>🦔 Controleer schuilplaatsen (takkenhopen, steenhopen)</li>
                  <li>🐝 Insectenhotels controleren op bezetting</li>
                </ul>
              </div>
            )}
          </section>
        )}

        {/* ══════════════════════════════════════════════════
            REPORT TAB
        ══════════════════════════════════════════════════ */}
        {tab === 'report' && (
          <section>
            <div className="report-header">
              <h2>{t.reportTitle}</h2>
              <button className="btn btn-primary" onClick={() => window.print()}>🖨 {t.printReport}</button>
            </div>

            {/* Company summary */}
            <div className="card report-section">
              <h3>{t.reportCompany}</h3>
              <div className="report-grid">
                <div className="report-row"><span>{t.companyName}</span><strong>{company.name || '—'}</strong></div>
                <div className="report-row"><span>{t.address}</span><strong>{[company.address, company.postcode, company.city].filter(Boolean).join(', ') || '—'}</strong></div>
                <div className="report-row"><span>{t.country}</span><strong>{company.country || '—'}</strong></div>
                <div className="report-row"><span>{t.growerName}</span><strong>{company.growerName || '—'}</strong></div>
                <div className="report-row"><span>{t.regNo}</span><strong>{company.regNo || '—'}</strong></div>
                <div className="report-row"><span>{t.certNo}</span><strong>{company.certNo || '—'}</strong></div>
                <div className="report-row"><span>{t.cropYear}</span><strong>{company.cropYear}</strong></div>
                <div className="report-row"><span>{t.totalArea}</span><strong>{company.totalArea ? `${company.totalArea} ha` : '—'}</strong></div>
                <div className="report-row"><span>{t.totalPlots}</span><strong>{company.totalPlots || '—'}</strong></div>
              </div>
            </div>

            {/* Habitat summary */}
            <div className="card report-section">
              <h3>{t.reportHabitat}</h3>
              <div className="report-grid">
                <div className="report-row"><span>{t.habitatArea}</span><strong>{area2026.toFixed(3)} ha</strong></div>
                <div className="report-row">
                  <span>{t.habitatPct}</span>
                  <strong>{pct !== null ? `${pct} %` : t.divisionSafe}</strong>
                </div>
                <div className="report-row"><span>{t.bonusPoints}</span><strong>{bonus}</strong></div>
              </div>

              {/* Per-year row */}
              <table className="report-year-table">
                <thead>
                  <tr>
                    <th></th>
                    {YEAR_KEYS.map(({ key, label }) => <th key={key}>{t[label]}</th>)}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{t.habitatArea} (ha)</td>
                    {YEAR_KEYS.map(({ key }) => (
                      <td key={key}>{calcHabitatArea(measures, key).toFixed(3)}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>{t.bonusPoints}</td>
                    {YEAR_KEYS.map(({ key }) => (
                      <td key={key}>{calcBonusPoints(measures, key)}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Measures list */}
            <div className="card report-section">
              <h3>{t.reportMeasures}</h3>
              {MEASURES.filter(m => (measures[m.code]?.y2026 || 0) > 0).length === 0
                ? <p className="muted">{t.noMeasures}</p>
                : (
                  <table className="report-measures-table">
                    <thead>
                      <tr>
                        <th>{t.colCode}</th>
                        <th>{t.colMeasure}</th>
                        <th>{t.colUnit}</th>
                        <th>{t.col2026}</th>
                        <th>{t.colPlan2028}</th>
                        <th>{t.colPlan2030}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {MEASURES.filter(m => (measures[m.code]?.y2026 || 0) > 0).map(m => (
                        <tr key={m.code}>
                          <td><code>{m.code}</code></td>
                          <td>{m.name[lang] || m.name.en}</td>
                          <td>{t[m.unit] || m.unit}</td>
                          <td>{measures[m.code]?.y2026 ?? 0}</td>
                          <td>{measures[m.code]?.plan2028 ?? 0}</td>
                          <td>{measures[m.code]?.plan2030 ?? 0}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
            </div>
          </section>
        )}
      </main>

      <footer className="footer">
        <span>© 2024 On the way to PlanetProof · Stichting Milieukeur · DEMO</span>
        <a href="https://www.planetproof.eu" target="_blank" rel="noopener noreferrer">planetproof.eu ↗</a>
      </footer>
    </div>
  )
}
