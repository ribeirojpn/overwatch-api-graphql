$(document).ready(function () {
  $.ajax({
    method: 'GET',
    url: '/heroes?query={heroes{name,real_name,age,description,role,occupation,base,affiliation,url,abilities{name,description,icon_url},tag}}'
  }).done(function (data) {
    $('#response-json').text(JSON.stringify(data, null, 2))
  })

  $('#btn-request').click(function () {
    let queryString = ''
    let tag = $('#tag').val()

    $('.checkbox-group').find("input[type='checkbox']").each(function () {
      if ($(this).prop('checked') === true) {
        if (queryString !== '') {
          queryString = queryString + ','
        }

        if ($(this).val() === 'abilities') {
          queryString = queryString + 'abilities{name,description,icon_url}'
        } else {
          queryString = queryString + $(this).val()
        }
      }
    })

    $.ajax({
      method: 'GET',
      url: `/heroes?query={hero(tag:"${tag}"){${queryString}}}`
    }).done(function (data) {
      $('#response-json').text(JSON.stringify(data, null, 2))
    })
  })
})
