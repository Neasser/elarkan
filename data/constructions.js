/**
 * دار الأركان للتطوير العقاري - بيانات الإنشاءات المركزية
 * Single Source of Truth for:
 * 1. Home page "Latest Constructions" preview
 * 2. Dedicated Constructions page (constructions.html)
 * 3. Individual Project pages "Construction Progress" tab (project-*.html)
 */

window.KayanConstructions = {
  projects: [
    {
      id: 'd384',
      name: 'مشروع D 384 – النرجس الجديدة',
      shortName: 'D 384',
      category: 'current',
      categoryName: 'المشروعات المتاحة',
      location: 'النرجس الجديدة – التجمع الخامس',
      projectUrl: 'project-d384.html',
      overallPercent: 80,
      currentStageName: 'أعمال الهيكل الخرساني والتشطيبات الخارجية',
      featuredImage: 'images/constructions/const-d384-1.jpg',
      stages: [
        {
          id: 'stage-1',
          title: 'الأساسات والصبة الخرسانية المسلحة',
          date: 'سبتمبر 2026',
          desc: 'الانتهاء من أعمال الحفر والأساسات المسلحة وصبة القواعد الخرسانية وفق الاشتراطات والمواصفات القياسية.',
          images: [
            'images/constructions/const-d384-1.jpg',
            'images/constructions/const-d384-2.jpg'
          ],
          videos: [
            {
              src: 'videos/constructions/const-d384.mp4',
              poster: 'images/constructions/poster-d384.jpg',
              title: 'توثيق فيديو لموقع D 384'
            }
          ]
        },
        {
          id: 'stage-2',
          title: 'الهيكل الإنشائي وصبة الأسقف المتكررة',
          date: 'أكتوبر 2026',
          desc: 'استكمال صبة الأسقف والأعمدة للأدوار المتكررة وبدء تجهيزات أعمال المباني الداخلية.',
          images: [
            'images/constructions/const-d384-3.jpg',
            'images/constructions/const-d384-4.jpg'
          ],
          videos: []
        }
      ]
    },
    {
      id: 'g30',
      name: 'مشروع G30 – الحي السادس بيت الوطن',
      shortName: 'G 30',
      category: 'current',
      categoryName: 'المشروعات المتاحة',
      location: 'بيت الوطن – الحي السادس',
      projectUrl: 'project-g30.html',
      overallPercent: 85,
      currentStageName: 'الحي مستلم رسمياً وجاهزية أعمال التشطيبات المتقدمة',
      featuredImage: 'images/constructions/const-g30-1.jpg',
      stages: [
        {
          id: 'stage-1',
          title: 'استكمال الهيكل الخرساني بالكامل',
          date: 'أغسطس 2026',
          desc: 'إنهاء صبة الهيكل الإنشائي والأسقف لجميع طوابق المشروع بالكامل.',
          images: [
            'images/constructions/const-g30-1.jpg',
            'images/constructions/const-g30-2.jpg'
          ],
          videos: [
            {
              src: 'videos/constructions/const-g30.mp4',
              poster: 'images/constructions/poster-g30.jpg',
              title: 'مقطع فيديو يوضح تقدم أعمال موقع G30'
            }
          ]
        },
        {
          id: 'stage-2',
          title: 'أعمال المباني والعزل والتأسيس',
          date: 'أكتوبر 2026',
          desc: 'تنفيذ أعمال عزل الأسقف والحمامات والانتهاء من التقسيمات الداخلية للبلوكات.',
          images: [
            'images/constructions/const-g30-3.jpg',
            'images/constructions/const-g30-4.jpg'
          ],
          videos: []
        }
      ]
    },
    {
      id: 'c87',
      name: 'مشروع C87 – الحي الأول بيت الوطن',
      shortName: 'C 87',
      category: 'current',
      categoryName: 'المشروعات المتاحة',
      location: 'بيت الوطن – الحي الأول',
      projectUrl: 'project-c87.html',
      overallPercent: 75,
      currentStageName: 'تنفيذ الأسقف والأعمدة الخرسانية',
      featuredImage: 'images/constructions/const-c87-1.jpg',
      stages: [
        {
          id: 'stage-1',
          title: 'صبة سقف الدور الأرضي والأعمدة',
          date: 'سبتمبر 2026',
          desc: 'أعمال التدعيم والحدادة والنجارة المسلحة تمهيداً لصبة الأسقف المتعاقبة.',
          images: [
            'images/constructions/const-c87-1.jpg',
            'images/constructions/const-c87-2.jpg'
          ],
          videos: [
            {
              src: 'videos/constructions/const-c87.mp4',
              poster: 'images/constructions/poster-c87.jpg',
              title: 'توثيق صبة وتطور إنشاءات موقع C87'
            }
          ]
        },
        {
          id: 'stage-2',
          title: 'أعمال الأدوار المتكررة',
          date: 'أكتوبر 2026',
          desc: 'متابعة أعمال صب الأسقف المتكررة ورفع التشوينات لمراحل المباني.',
          images: [
            'images/constructions/const-c87-3.jpg',
            'images/constructions/const-c87-4.jpg'
          ],
          videos: []
        }
      ]
    },
    {
      id: 'a187',
      name: 'مشروع A187 – الحي الثاني بيت الوطن',
      shortName: 'A 187',
      category: 'current',
      categoryName: 'المشروعات المتاحة',
      location: 'بيت الوطن – الحي الثاني',
      projectUrl: 'project-a187.html',
      overallPercent: 80,
      currentStageName: 'أعمال مباني الطوابق والواجهات المعمارية',
      featuredImage: 'images/constructions/const-a187-1.jpg',
      stages: [
        {
          id: 'stage-1',
          title: 'الهيكل الإنشائي والصبات الخرسانية',
          date: 'أغسطس 2026',
          desc: 'الانتهاء من الأساسات وسقف البدروم والأرضي والأدوار المتكررة بنجاح.',
          images: [
            'images/constructions/const-a187-1.jpg',
            'images/constructions/const-a187-2.jpg'
          ],
          videos: [
            {
              src: 'videos/constructions/const-a187.mp4',
              poster: 'images/constructions/poster-a187.jpg',
              title: 'مقطع فيديو توثيقي لإنشاءات A187'
            }
          ]
        },
        {
          id: 'stage-2',
          title: 'المباني وأعمال المحارة الأولية',
          date: 'أكتوبر 2026',
          desc: 'البدء في بناء الحوائط الخارجية والداخلية والتأسيس الكهربائي والصحي.',
          images: [
            'images/constructions/const-a187-3.jpg',
            'images/constructions/const-a187-4.jpg'
          ],
          videos: []
        }
      ]
    },
    {
      id: 'a61',
      name: 'مشروع A61 – الحي الرابع بيت الوطن',
      shortName: 'A 61',
      category: 'current',
      categoryName: 'المشروعات المتاحة',
      location: 'بيت الوطن – الحي الرابع',
      projectUrl: 'project-a61.html',
      overallPercent: 88,
      currentStageName: 'استكمال التشطيبات الخارجية والواجهات الفاخرة',
      featuredImage: 'images/constructions/const-a61-1.jpg',
      stages: [
        {
          id: 'stage-1',
          title: 'اكتمال صبة كامل الأسقف والأعمدة',
          date: 'يوليو 2026',
          desc: 'إنجاز كامل الهيكل الإنشائي للوحدات والروف بنسبة 100%.',
          images: [
            'images/constructions/const-a61-1.jpg',
            'images/constructions/const-a61-2.jpg'
          ],
          videos: [
            {
              src: 'videos/constructions/const-a61.mp4',
              poster: 'images/constructions/poster-a61.jpg',
              title: 'فيديو موقع مشروع A61 بالحي الرابع'
            }
          ]
        },
        {
          id: 'stage-2',
          title: 'المباني المتقدمة والواجهات',
          date: 'أكتوبر 2026',
          desc: 'أعمال تجهيز الواجهات الخارجية وتركيب الحلوق وأعمال العزل الحراري والرطوبي.',
          images: [
            'images/constructions/const-a61-3.jpg',
            'images/constructions/const-a61-4.jpg'
          ],
          videos: []
        }
      ]
    },
    {
      id: 'd80',
      name: 'مشروع D80 – الحي الثامن بيت الوطن',
      shortName: 'D 80',
      category: 'current',
      categoryName: 'المشروعات المتاحة',
      location: 'بيت الوطن – الحي الثامن',
      projectUrl: 'project-d80.html',
      overallPercent: 70,
      currentStageName: 'الانتهاء من أعمال الصبة الخرسانية لسقف الدور الأول',
      featuredImage: 'images/constructions/const-d80-1.jpg',
      stages: [
        {
          id: 'stage-1',
          title: 'الأساسات وسقف البدروم والأرضي',
          date: 'أغسطس 2026',
          desc: 'صبة القواعد الخرسانية العادية والمسلحة وعزل الأساسات حتى مستوى الصفر المعماري.',
          images: [
            'images/constructions/const-d80-1.jpg',
            'images/constructions/const-d80-2.jpg'
          ],
          videos: []
        },
        {
          id: 'stage-2',
          title: 'الانتهاء من صبة سقف الدور الأول المتكرر',
          date: 'أكتوبر 2026',
          desc: 'الانتهاء التام من أعمال الصبة الخرسانية لسقف الدور الأول واستكمال باقي الأدوار.',
          images: [
            'images/constructions/const-d80-3.jpg',
            'images/constructions/const-d80-4.jpg'
          ],
          videos: [
            {
              src: 'videos/constructions/const-d80.mp4',
              poster: 'images/constructions/poster-d80.jpg',
              title: 'الانتهاء من أعمال الصبة الخرسانية لسقف الدور الأول D80'
            }
          ]
        }
      ]
    },
    {
      id: '728',
      name: 'مشروع 728 – الأندلس',
      shortName: '728 الأندلس',
      category: 'previous',
      categoryName: 'سابقة الأعمال (تم التسليم)',
      location: 'الأندلس – التجمع الخامس',
      projectUrl: 'projects.html?status=delivered',
      overallPercent: 100,
      currentStageName: 'مشروع منفذ ومسلم بالكامل',
      featuredImage: 'images/constructions/const-728-1.jpg',
      stages: [
        {
          id: 'stage-1',
          title: 'المراحل الإنشائية والتشطيبات النهائية',
          date: 'سابق',
          desc: 'توثيق مراحل صبة الهيكل وأعمال الواجهات حتى التسليم النهائي لعملاء المشروع.',
          images: [
            'images/constructions/const-728-1.jpg',
            'images/constructions/const-728-2.jpg',
            'images/constructions/const-728-3.jpg',
            'images/constructions/const-728-4.jpg'
          ],
          videos: []
        }
      ]
    },
    {
      id: 'd41',
      name: 'مشروع D41 – بيت الوطن الحي التكميلي',
      shortName: 'D41 التكميلي',
      category: 'previous',
      categoryName: 'سابقة الأعمال (تم التسليم)',
      location: 'بيت الوطن – الحي التكميلي',
      projectUrl: 'projects.html?status=delivered',
      overallPercent: 100,
      currentStageName: 'مشروع منفذ ومسلم بالكامل',
      featuredImage: 'images/constructions/const-d41-1.jpg',
      stages: [
        {
          id: 'stage-1',
          title: 'مراحل البناء والتنفيذ المتكاملة',
          date: 'سابق',
          desc: 'توثيق مراحل تشييد القواعد والأسقف والواجهات الخارجية للمشروع.',
          images: [
            'images/constructions/const-d41-1.jpg',
            'images/constructions/const-d41-2.jpg',
            'images/constructions/const-d41-3.jpg',
            'images/constructions/const-d41-4.jpg'
          ],
          videos: []
        }
      ]
    },
    {
      id: '620',
      name: 'مشروع 620 – الأندلس',
      shortName: '620 الأندلس',
      category: 'previous',
      categoryName: 'سابقة الأعمال (تم التسليم)',
      location: 'الأندلس – التجمع الخامس',
      projectUrl: 'projects.html?status=delivered',
      overallPercent: 100,
      currentStageName: 'مشروع منفذ ومسلم بالكامل',
      featuredImage: 'images/constructions/const-620-1.jpg',
      stages: [
        {
          id: 'stage-1',
          title: 'الأعمال الإنشائية والواجهات',
          date: 'سابق',
          desc: 'تنفيذ وتشطيب العمارة وفق الطابع المعماري الكلاسيكي الفاخر وتسليمها.',
          images: [
            'images/constructions/const-620-1.jpg',
            'images/constructions/const-620-2.jpg',
            'images/constructions/const-620-3.jpg',
            'images/constructions/const-620-4.jpg'
          ],
          videos: []
        }
      ]
    },
    {
      id: '457',
      name: 'مشروع 457 – الأندلس',
      shortName: '457 الأندلس',
      category: 'previous',
      categoryName: 'سابقة الأعمال (تم التسليم)',
      location: 'الأندلس – التجمع الخامس',
      projectUrl: 'projects.html?status=delivered',
      overallPercent: 100,
      currentStageName: 'مشروع منفذ ومسلم بالكامل',
      featuredImage: 'images/constructions/const-457-1.jpg',
      stages: [
        {
          id: 'stage-1',
          title: 'مراحل التنفيذ والتشطيب النهائي',
          date: 'سابق',
          desc: 'توثيق إنشاء وتسليم مشروع 457 في منطقة الأندلس بالتجمع الخامس.',
          images: [
            'images/constructions/const-457-1.jpg',
            'images/constructions/const-457-2.jpg',
            'images/constructions/const-457-3.jpg',
            'images/constructions/const-457-4.jpg'
          ],
          videos: []
        }
      ]
    }
  ],

  // Utility to find by project ID
  getById: function(id) {
    if (!id) return null;
    var cleanId = id.toString().toLowerCase().replace(/[^a-z0-9]/g, '');
    for (var i = 0; i < this.projects.length; i++) {
      var pId = this.projects[i].id.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (pId === cleanId) return this.projects[i];
    }
    return null;
  }
};