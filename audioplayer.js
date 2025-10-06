document.getElementById('audioupload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const audio = document.getElementById('audioplay');
    // play the audio file
    if (file) {
      audio.src = URL.createObjectURL(file);
      audio.load();
      audio.play();
    }
    //show the cover art
    jsmediatags.read(file, {
        onSuccess: function(tag) {
          const pic = tag.tags.picture;
          if (pic) {
            let base64String = '';
            for (let i = 0; i < pic.data.length; i++) {
              base64String += String.fromCharCode(pic.data[i]);
            }
            document.getElementById('coverart').src = 
              'data:' + pic.format + ';base64,' + btoa(base64String);
            document.getElementById('coverart').style.display = 'block';
          }
        },
        onError: function(error) {
          console.log('Error reading tags: ', error);
        }
      });
  });