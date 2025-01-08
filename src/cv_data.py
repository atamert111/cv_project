



def get_sample_data():
    data = {
        # step1
        'name': 'Mahmut',
        'surname': 'Yaramaz',
        'personal_info_name': 'Mahmut Yaramaz',
        'personal_info_phone': '+90 212 123 45 67',
        'personal_info_email': 'ayla.candan@example.com',
        'personal_info_address': 'İstanbul',
        'military_service_status': 'yapildi',
        'driver_license': 'A1',
        'marital_status': 'evli',
        'personal_info_profile_photo': '',
        'profile_photo_uploaded': False,
        # step2
        'job_experiences': [
            {
                'company_name': 'Medika Hastanesi',
                'position': 'Kardiyoloji Doktoru',
                'start_date': '2018-01-10',
                'end_date': '2020-02-12',
                'description': 'Hastane başvuran hastaların kardiyovasküler rahatsızlıklarını teşhis ve tedavi ettim.',
                'location' : 'Bolge saglik',
                'same_company': False
            },
            {
                'company_name': 'Medika Hastanesi 2',
                'position': 'Kardiyoloji Doktoru 2',
                'start_date': '2021-03-13',
                'end_date': '2025-04-14',
                'description': 'Hastane başvuran hastaların kardiyovasküler rahatsızlıklarını teşhis ve tedavi ettim.  2',
                'location' : 'Bolge saglik 2',
                'same_company': False
            }
        ],
        'education': [],
        'certificates': [],
        'languages': [],
        'technical_skills': [],
        'soft_skills': [],
        'projects': [],
        'references': [],
        'self_about': '',
        # step3
        'template': '1'
    }

    return data

def merge_data(old, new):
    return {**old, **new}


