def get_default_data():
    """
    Boş bir varsayılan veri yapısını döndürür.
    """
    return {
        # step1
        'name': '',
        'surname': '',
        'personal_info_name': '',
        'personal_info_phone': '',
        'personal_info_email': '',
        'personal_info_address': '',
        'personal_info_birthday': '',
        'military_service_status': '',
        'driver_license': '',
        'marital_status': '',
        'personal_info_profile_photo': '',
        'profile_photo_uploaded': False,
        # step2
        'job_experiences': [],
        'education': [],
        'certificates': [],
        'languages': [],
        'technical_skills': [],
        'soft_skills': [],
        'projects': [],
        'references': [],
        'self_about': '',
        # step3
        'template': ''
    }

def get_sample_data():
    """
    Test amaçlı kullanılan dolu bir veri yapısını döndürür.
    """
    data = get_default_data()  # Varsayılan yapıyı al
    data.update({  # `update` düzgün çağrılıyor
        # step1
        'name': 'Mahmut',
        'surname': 'Yaramaz',
        'personal_info_name': 'Mahmut Yaramaz',
        'personal_info_phone': '+90 212 123 45 67',
        'personal_info_email': 'ayla.candan@example.com',
        'personal_info_address': 'İstanbul',
        'personal_info_birthday' : '1995-07-12',
        'military_service_status': 'yapildi',
        'driver_license': 'A1',
        'marital_status': 'evli',
        
        # step2
        'job_experiences': [
            {
                'company_name': 'Medika Hastanesi',
                'position': 'Kardiyoloji Doktoru',
                'start_date': '2018-01-10',
                'end_date': '2020-02-12',
                'description': 'Hastane başvuran hastaların kardiyovasküler değerlendirmelerini yaptı.',
                'location': 'Bölge Sağlık',
                'work_type': 'full_time',  
                'work_location': 'hybrid',  
                'same_company': False
            },
            {
                'company_name': 'Medika Hastanesi 2',
                'position': 'Kardiyoloji Doktoru 2',
                'start_date': '2021-03-13',
                'end_date': '2025-04-14',
                'description': 'Hastane başvuran hastaların kardiyovasküler değerlendirmelerini yaptı. 2',
                'location': 'Bölge Sağlık 2',
                'work_type': 'part_time',  
                'work_location': 'office',  
                'same_company': False
            }
        ],

        
        'education': [
            {
                'school_name': 'Yediyepe Üniversitesi',
                'department': 'Makine Mühendisliği',
                'faculty_name': 'Mühendislik Fakültesi',
                'degree': 'Lisans',  
                'start_year': '2014',
                'end_year': '2020',
                'grade': '90.5',  
                'currently_studying': False
            },
            {
                'school_name': 'Marmara Üniversitesi',
                'department': 'Kimya Mühendisliği',
                'faculty_name': 'Mühendislik Fakültesi',
                'degree': 'Lisans',  
                'start_year': '2013',
                'end_year': '2019',
                'grade': '85.0',  
                'currently_studying': False
            }
        ],
        'languages': [ 
            {
                'name': 'İngilizce',
                'level': '5'
            },
            {
                'name': 'Almanca',
                'level': '3'
            }
        ],

        'technical_skills': [ 
            {
                'name': 'Python',
                'level': '5'
            },
            {
                'name': 'Matlab',
                'level': '4'
            }
        ],
        'projects': [
            {
                'name': 'Akıllı Tarım Projesi',
                'date': '2023-06-15',
                'link': 'https://github.com/mahmut/akilli-tarim',
                'description': 'IoT sensörleri ile tarım alanlarını izleyen ve otomatik sulama sağlayan bir sistem geliştirdim.'
            },
            {
                'name': 'Makine Öğrenimi ile Kanser Teşhisi',
                'date': '2022-09-10',
                'link': 'https://github.com/mahmut/kanser-teshisi-ml',
                'description': 'Makine öğrenimi kullanarak kanser hücrelerini sınıflandıran bir model geliştirdim.'
            }
        ],
        'certificates': [
            {
                'name': 'Python Veri Bilimi Sertifikası',
                'date': '2022',
                'issuer': 'Coursera'
            },
            {
                'name': 'Makine Öğrenmesi Sertifikası',
                'date': '2021',
                'issuer': 'Google AI'
            }
        ],
        'references': [
            {
                'name': 'Dr. Ahmet Yılmaz',
                'position': 'Üniversite Profesörü',
                'contact': 'ahmet.yilmaz@example.com'
            },
            {
                'name': 'Merve Demir',
                'position': 'Eski İş Arkadaşı',
                'contact': '+90 530 123 45 67'
            }
        ],
        'soft_skills': [ 
            {
                'name': 'İletişim',
                'level': '5'
            },
            {
                'name': 'Liderlik',
                'level': '3'
            }
        ] ,
        'self_about': "Merhaba, ben Mahmut Yaramaz. Makine mühendisliği alanında uzmanlaştım ve Python, Matlab gibi dillerde teknik bilgiye sahibim. Takım çalışmasına yatkın, iletişim becerisi güçlü bir mühendis olarak projelerde etkin rol almaktan keyif alıyorum." 
    })

    return data

def merge_data(old, new):
    """
    Eski ve yeni verileri birleştirir.
    """
    return {**old, **new}
